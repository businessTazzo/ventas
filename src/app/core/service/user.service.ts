import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  boolShowInputsPass$ = new BehaviorSubject<any>(true);
  boolShowInputStatus$ = new BehaviorSubject<any>(true);
  nextListarAll$ = new BehaviorSubject<number>(0);
  autoClose$ = new BehaviorSubject<number>(0);

  private url: string = `${environment.HOST}/user`;

  saveUser(user: Auth): Observable<any>{
    return this.http.post<any>(`${this.url}`, user);
    }

    editUser(user: Auth){
        return this.http.put<any>(`${this.url}/${user.id}`, user);
    }
    updateStatus(user: Auth): Observable<any>{
        return this.http.put<any>(`${this.url}/updateStatus/${user.id}`, user);
    }

    updatePass(user: Auth): Observable<any>{
        return this.http.put<any>(`${this.url}/updatePass/${user.id}`, user);
    }
    //   getUsersAll(): Observable<any>{

    //     return this.http.get<Auth[]>(`${this.url}`);
    //   }
    getUsersAll(sort:string, page:number, size:number) {
        return this.http.get<any>(`${this.url}?sort=${sort}&page=${page}&size=${size}`);
    }

    getUsuarioId(idUser: number){
        return this.http.get(`${this.url}/id/${idUser}`);
    }

    getUserName(username: string): Observable<any>{
        return this.http.get<Auth>(`${this.url}/name/${username}`);
    }

    getFindByUsername(sort:string, page:number, size:number, username: string) {
        return this.http.get<any>(`${this.url}/findbyusername?sort=${sort}&page=${page}&size=${size}&username=${username}`);
    }

    getPerfilAdmin(){
        return this.http
            .get<any>("assets/demo/data/perfil-admin.json")
            .toPromise()
    }
    getPerfilIng(){
        return this.http
            .get<any>("assets/demo/data/perfil-ing.json")
            .toPromise()
    }
    getPerfilMkt(){
        return this.http
            .get<any>("assets/demo/data/perfil-mkt.json")
            .toPromise()
    }

    getPerfilUser(){
        return this.http
            .get<any>("assets/demo/data/perfil-user.json")
            .toPromise()
    }

    // { "nombre": "USER", "id": 2, "descripcion": "Usuario"}
    getRoles(){
        return this.http
            .get<any>("assets/demo/data/roles.json")
            .toPromise()
    }

    updateRol(user: Auth): Observable<any>{
        return this.http.put<any>(`${this.url}/updaterol/${user.id}`, user);
    }

    updatePermissions(user: Auth, rowIndex: number): Observable<any>{
        return this.http.put<any>(`${this.url}/updatepermissions/${user.id}/${rowIndex}`, user);
    }
}
