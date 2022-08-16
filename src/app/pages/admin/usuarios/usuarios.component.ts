import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Auth } from 'src/app/core/model/auth';
import { Rol } from 'src/app/core/model/rol';
import { UserService } from 'src/app/core/service/user.service';
import { ModalUserComponent } from 'src/app/modules/modal-user/modal-user.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
    customers: any;
    loading: boolean = false;
    roles: Rol[];
    @ViewChild(ModalUserComponent) modalUserComponent: ModalUserComponent;
    user: Auth =
     {
        id: 0,
        username: '',
        name: '',
        lastName: '',
        emailAddress: '',
        password: '',
        enabled: true,
        // rolActivate:[],
        roles: [],
        permissions: [],
        userCreate: '',
        userUpdate: ''
      };

      totalRecords: number;
      rows = 10;
      sort: string = "createdDate";
      page: number = 0;
      size: number = 10;

      userName: string ='';
      modelsAdmin: any[];
      modelsIng: any[];
      modelsMkt: any[];
      modelsUser: any[];

      displayConfigNewPass: boolean = false;
      passwordUser: string = '';
      newPasswordUser: string = '';

      boolUpdateStatus: boolean = false;
      subsVarNew: Subscription;
      subsVarUpd: Subscription;
      forma: FormGroup;
    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private userService: UserService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private primeNGConfig: PrimeNGConfig) {
        this.breadcrumbService.setItems([
            { label: "Administración" },
            { label: "Usuarios", routerLink: ['/admin/usuarios'] }
        ]);
    }

    ngOnInit() {
        this.userService.nextListarAll$.subscribe((d)=>{
            if(d==1)
                this.getUsersAll();
        });
        this.getRolesAll();
        this.getPerfilAdmin();
        this.getPerfilIng();
        this.getPerfilMkt();
        this.getPerfilUser();

        this.forma = this.formBuilder.group({
            forContraseña:[ null, Validators.compose([
                Validators.required,
                // verificar si la contraseña ingresada tiene un número
                this.patternValidator(/\d/, { hasNumber: true }),
                // verifique si la contraseña ingresada tiene letras mayúsculas
                this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // verificar si la contraseña ingresada tiene una letra minúscula
                this.patternValidator(/[a-z]/, { hasSmallCase: true }),
                // comprobar si la contraseña introducida tiene un carácter especial
                // this.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
                // Tiene una longitud mínima de 8 caracteres
                Validators.minLength(6)])
            ],
            newForContraseña:[null,[ Validators.required]]
        }
        ,{ validators: this.sonIguales('forContraseña', 'newForContraseña') }
        );
        this.primeNGConfig.ripple = true;

    }

    sonIguales(campo1: string, campo2: string) {
        return (group: FormGroup) => {
        const pass1 = group.controls[campo1].value;
        const pass2 = group.controls[campo2].value;
        if (pass1 !== pass2) {
            return {sonDistintas: true};
        }else{
            return {sonDistintas: false};
        }
        };
    }

    patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // si el control está vacío no devuelve ningún error
            return null;
        }
        // probar el valor del control contra la expresión regular suministrada
        const valid = regex.test(control.value);
        // si es verdadero, no devuelve ningún error (sin error), de lo contrario,
        // devuelve el error pasado en el segundo parámetro
        return valid ? null : error;
        };
    }

    hasFormErrors(){
        return !this.forma.valid;
    }
    fieldErrors(field: string){
        let constrolState = this.forma.controls[field];
        return (constrolState.dirty && constrolState.errors) ? constrolState.errors : null;
    }

    setMyPagination(event: LazyLoadEvent) {
        this.page = (event.first/event.rows);
        this.size = event.rows;

        this.getUsersAll();
    }

    getUsersAll(){
        this.loading = true;
        this.userService.getUsersAll(this.sort, this.page, this.size).subscribe(data => {
            this.loading = false;
            if (data!=null) {
                this.customers = data.content;
                this.totalRecords = data.totalElements;
            } else {
                this.customers = [];
                this.totalRecords = 0;
            }
        },err => {
            this.loading = false;
            console.error("getUsersAll: ", err);
        });
    }

  getRolesAll(){
    this.userService.getRoles().then((data: any) => {
        this.roles = data
    });
  }

    // selectUser(user) {


    //     // this.messageService.add({severity:'info', summary:'Product Selected', detail: product.name});
    // }
    editUser(user){

        this.userService.boolShowInputsPass$.next(false);
        this.userService.boolShowInputStatus$.next(true);

        this.userService.getUsuarioId(user.id).subscribe((res: any) => {
            this.user = res;
            this.modalUserComponent.open();
            this.modalUserComponent.titulo = "Editar Usuario";

            this.modalUserComponent.documento = this.user.username;
            this.modalUserComponent.roleSelect = this.roles.filter((data)=>{return data.nombre == this.user.roles[0]})[0];
            this.modalUserComponent.email = this.user.emailAddress;
            this.modalUserComponent.status = this.user.enabled;
            this.modalUserComponent.passwordUser = 'Hola12';
            this.modalUserComponent.newPasswordUser = 'Hola12';
            this.modalUserComponent.nombreUsuario = this.user.name;
            this.modalUserComponent.apellidoUsuario = this.user.lastName;

            if (this.subsVarUpd) {
                this.subsVarUpd.unsubscribe()
            }
            this.subsVarUpd = this.modalUserComponent.clickevent.subscribe(() => {

                this.user.username = this.modalUserComponent.documento;
                this.user.roles = [];
                this.user.roles.push(this.modalUserComponent.roleSelect.nombre);
                this.user.emailAddress = this.modalUserComponent.email;
                this.user.enabled = this.modalUserComponent.status;
                this.user.password = this.modalUserComponent.passwordUser;
                this.user.name = this.modalUserComponent.nombreUsuario;
                this.user.lastName = this.modalUserComponent.apellidoUsuario;
                this.user.userUpdate = (sessionStorage.getItem("user") == null) ? 'admin':JSON.parse(sessionStorage.getItem("user")).username;

                this.userService.editUser(this.user).subscribe((resp) =>{
                    this.modalUserComponent.passwordUser = null;
                    this.modalUserComponent.newPasswordUser = null;
                    this.modalUserComponent.close();

                    this.setSessionStorageUser();

                    this.customers.map((user)=>{
                        if(user.id == this.user.id){
                            user.username = resp.username;
                            user.roles = resp.roles;
                            user.emailAddress = resp.emailAddress;
                            user.enabled = resp.enabled;
                            user.name = resp.name;
                            user.lastName = resp.lastName;
                        }
                        return user;
                    });
                },err => {
                    console.error("editUser error: ", err);

                });
            });
        });
    }



    getFindByUsername(){
        if (this.userName.length > 0) {
            this.page = 0;
            this.userService.getFindByUsername(this.sort, this.page, this.size, this.userName).subscribe((data: any) => {

                if (data!=null) {
                    this.customers = data.content;
                    this.totalRecords = data.totalElements;
                } else {
                    this.customers = [];
                    this.totalRecords = 0;
                }

                if(this.totalRecords == 0){
                    this.messageService.add({
                        key: 'm1',
                        severity: 'info',
                        summary: 'Información',
                        detail: "No se encontraron registros"});
                }
            },
            error => console.error(error)
            );
        }else{
            if (this.userName=='') {
                this.getUsersAll();
            }else{
                this.messageService.add({
                    key: 'm1',
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: "El campo 'Búsqueda global' debe tener mas de 1 caracteres"});
            }
        }
    }

    addNewUser(){

        this.userService.boolShowInputsPass$.next(true);
        this.userService.boolShowInputStatus$.next(false);
        this.modalUserComponent.open();
        this.modalUserComponent.titulo = "Nuevo Usuario";

        this.modalUserComponent.documento = '';
        this.modalUserComponent.role = null;
        this.modalUserComponent.email = '';
        this.modalUserComponent.status = true;
        this.modalUserComponent.passwordUser = '';
        this.modalUserComponent.newPasswordUser = '';
        this.modalUserComponent.nombreUsuario = '';
        this.modalUserComponent.apellidoUsuario = '';
        if (this.subsVarNew) {
            this.subsVarNew.unsubscribe()
        }

        this.subsVarNew = this.modalUserComponent.clickevent.subscribe(() => {
            this.user.username = this.modalUserComponent.documento;
            this.user.roles = [];
            this.user.roles.push(this.modalUserComponent.roleSelect.nombre);
            this.user.emailAddress = this.modalUserComponent.email;
            this.user.enabled = this.modalUserComponent.status;
            this.user.password = this.modalUserComponent.passwordUser;
            this.user.name = this.modalUserComponent.nombreUsuario;
            this.user.lastName = this.modalUserComponent.apellidoUsuario;
            this.user.userCreate = (sessionStorage.getItem("user") == null) ? 'admin':JSON.parse(sessionStorage.getItem("user")).username;
            this.user.permissions = (this.modalUserComponent.roleSelect.nombre=='ADMIN') ? this.modelsAdmin :
            (this.modalUserComponent.roleSelect.nombre=='ING') ? this.modelsIng :
            (this.modalUserComponent.roleSelect.nombre=='MKT') ? this.modelsMkt :
            this.modelsUser;

            this.user.userUpdate = this.user.userCreate;

            this.verifyDuplicateUserName(this.user.username);

        });
    }
    verifyDuplicateUserName(username: string){
        this.userService.getUserName(username).subscribe((data: any) => {
            if(data == null){
                this.userService.saveUser(this.user).subscribe((resp) =>{
                    this.userService.nextListarAll$.next(1);
                    // enviar a actualizar a la lista de editUser
                    this.modalUserComponent.close();
                },err => {
                    console.error("saveUser err: ", err);
                });
            }else{
                this.messageService.add({
                    key: 'm1',
                    severity:'warn',
                    summary: 'Advertencia',
                    detail:'Ya se encuentra registrado el usuario '+this.user.username});
            }
        });
    }

    getPerfilAdmin(){
        this.userService.getPerfilAdmin().then((data: any) => {
            this.modelsAdmin = data
        });
    }
    getPerfilIng(){
        this.userService.getPerfilIng().then((data: any) => {
            this.modelsIng = data
        });
    }
    getPerfilMkt(){
        this.userService.getPerfilMkt().then((data: any) => {
            this.modelsMkt = data
        });
    }
    getPerfilUser(){
        this.userService.getPerfilUser().then((data: any) => {
            this.modelsUser = data
        });
    }

    setSessionStorageUser(){
        let username = (sessionStorage.getItem("user") == null) ? null :JSON.parse(sessionStorage.getItem("user")).username;
        if (username!=null && username == this.user.username) {
            this.userService.getUserName(username).subscribe((d)=>{
                sessionStorage.setItem('user', JSON.stringify(d));
            });
        }
    }

    showUpdatePass(user){
        this.displayConfigNewPass = true;
        this.user.id = user.id;
        this.user.userUpdate = (sessionStorage.getItem("user") == null) ? null :JSON.parse(sessionStorage.getItem("user")).username;
    }

    saveNewPassUser(){
        this.user.password = this.passwordUser;

        if(this.passwordUser == this.newPasswordUser){
            if (this.passwordUser.length > 5) {

                this.userService.updatePass(this.user).subscribe((res: any) => {
                    this.messageService.add({
                        key: 'm1',
                        severity: 'success',
                        summary: 'Éxito',
                        detail: "Actualizacón grabada correctamente"});

                    this.hideDisplayConfigNewPass();
                })

            }else{
                this.messageService.add({
                    key: 'm1',
                    severity:'warn',
                    summary: 'Advertencia',
                    detail:'La contraseña debe poseer mas de 5 caracteres'});
            }
        }else{
            this.messageService.add({
                key: 'm1',
                severity:'warn',
                summary: 'Advertencia',
                detail:'Las contraseñas deben de ser iguales'});
        }
    }

    hideDisplayConfigNewPass(){
        this.displayConfigNewPass = false;
        this.passwordUser = '';
        this.newPasswordUser = '';
    }

    updateStatus(user){
        this.onReject();
        this.user = user;
        this.user.userUpdate = (sessionStorage.getItem("user") == null) ? null :JSON.parse(sessionStorage.getItem("user")).username;
        let userStatusStr = (this.user.enabled)?'deshabilitar':'habilitar';
        this.boolUpdateStatus = true;
        this.messageService.add({key: 'm2', sticky: true, severity:'warn', summary:'¿Estas seguro de '+userStatusStr+' al usuario '+this.user.username+'?', detail:'Confirmar para continuar'});
    }

    onConfirm() {
        this.messageService.clear('m2');

        if (this.boolUpdateStatus) {
            this.user.enabled = (this.user.enabled) ? false : true;
            this.userService.updateStatus(this.user).subscribe((resp) =>{
                this.messageService.add({
                    key: 'm1',
                    severity: 'success',
                    summary: 'Éxito',
                    detail: "Actualizacón grabada correctamente"});
            },err => {
                console.error("updateStatusUser error: ", err);
            });
        }
        this.onReject();
    }

    onReject() {
        this.messageService.clear('m2');
        this.boolUpdateStatus = false;
    }

}
