import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { Rol } from 'src/app/core/model/rol';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
    @Input() display: boolean = false;
    @Input() titulo: string = '';
    @Input() nombreUsuario: string = null;
    @Input() apellidoUsuario: string = null;
    @Output() clickevent: EventEmitter <any> = new EventEmitter();
    @Input() documento: string = null;
    @Input() passwordUser: string = null;
    @Input() newPasswordUser: string = null;

    @Input() role: Rol[];
    @Input() roleSelect: any;

    @Input() email: string = null;
    @Input() status: boolean = true;

    forma: FormGroup;
    rolesParametros: any[];
    stateOptions: any[];
    boolShowInputsPass: boolean = true;
    boolShowInputStatus: boolean = true;
    disabled: boolean = true;
    constructor(
        private formBuilder: FormBuilder,
        private primeNGConfig: PrimeNGConfig,
        private userService: UserService) {
        this.stateOptions = [
            { label: "Off", value: false },
            { label: "On", value: true }
          ];
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

    ngOnInit() {
        this.userService.boolShowInputsPass$.subscribe((bool) => {
            this.boolShowInputsPass = bool;
        })
        this.userService.boolShowInputStatus$.subscribe((bool) => {
            this.boolShowInputStatus = bool;
        })

        this.forma = this.formBuilder.group({
            forEmail: [null, [Validators.required, Validators.email]],
            forDocumento: [null,[ Validators.required]],
            forNombreUsuario: [null,[ Validators.required]],
            forApellidoUsuario: [null,[ Validators.required]],

            // forContraseña: [null],
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

            forStatus: [null,[ Validators.required]],
            newForContraseña:[null,[ Validators.required]],
            forRole: [null,[ Validators.required]]
          }
          ,{ validators: this.sonIguales('forContraseña', 'newForContraseña') }
          );
        this.primeNGConfig.ripple = true;
        this.getRolesAll();
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
    getRolesAll(){
        this.userService.getRoles().then((data: any) => {
            this.rolesParametros = data
        });
    }
    // { validators: this.sonIguales('forContraseña', 'forNewContraseña') }

    hasFormErrors(){
        return !this.forma.valid;
    }
    fieldErrors(field: string){
        let constrolState = this.forma.controls[field];
        return (constrolState.dirty && constrolState.errors) ? constrolState.errors : null;
    }

    registrarUsuario() {
      if (this.forma.valid) {
        // if (this.boolShowInputsPass && (this.passwordUser==null || this.passwordUser=='')) {
        //     console.error("Debe poseer una contraseña");
        // }
        this.clickevent.emit();
      }
    }
    open() {
        this.display = true;
    }
    close() {
        this.display = false;
    }

    changeRole(event: any) {
        this.role = [];
        this.role.push(event.value);
    }
}
