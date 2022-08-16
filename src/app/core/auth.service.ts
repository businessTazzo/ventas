import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';

@Injectable()
export class AuthService {

  api = URL_SERVICIOS;

  constructor(
    private http: HttpClient,
    public router: Router,
  ) {
  }

  attemptAuth(usernameOrEmail: string, password: string): Observable<any> {
    const credentials = { usernameOrEmail: usernameOrEmail, password: password };
    return this.http.post(this.api + '/auth/signin', credentials).pipe(map((res:any) => {
      console.log(res)
      return res;
    }))
  }


}
