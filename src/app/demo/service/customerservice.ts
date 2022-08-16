import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../domain/customer';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getServicios() {
        return this.http.get<any>('assets/demo/data/servicios.json')
            .toPromise()
            .then(res => res.data as servicios[])
            .then(data => data);
    }
    getWs() {
        return this.http.get<any>('assets/demo/data/ws.json')
    }
    getDbInterface() {
        return this.http.get<any>('assets/demo/data/db-Interface.json')
    }
}

interface servicios {
    name: string;
    numero: string;
    estado: boolean;
  }
