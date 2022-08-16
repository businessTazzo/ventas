import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Favoritos', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: ['/Hacom/dashboard']},
                    {label: 'Servicio', icon: 'pi pi-th-large', routerLink: ['/Hacom/servicio/create']},
                    {label: 'USSD Create', icon: 'pi pi-th-large', routerLink: ['/Hacom/servicio/ussdcreate']}
                ]
            },
            {
                label: 'USSD', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Gestión Arbol', icon: 'pi pi-th-large', routerLink: ['/Hacom/ussd/gestionarbol']},
                    // {label: 'Reporteria', icon: 'pi pi-file-o', routerLink: ['/Hacom/ussd/reporteria']},
                    {label: 'Tester', icon: 'pi pi-mobile', routerLink: ['/Hacom/ussd/tester']},
                    {label: 'Plugins', icon: 'pi pi-mobile', routerLink: ['/Hacom/servicio/plugin']},
                    {label: 'WS', icon: 'pi pi-mobile', routerLink: ['/Hacom/servicio/ws']},
                    {label: 'BD', icon: 'pi pi-mobile', routerLink: ['/Hacom/servicio/bd']}
                ]
            },
            {
                label: 'Administración', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Seguridad', icon: 'pi pi-cog', routerLink: ['/Hacom/administracion/seguridad']},
                    {label: 'Auditoria', icon: 'pi pi-user-edit', routerLink: ['/Hacom/administracion/auditoria']},
                    {label: 'usuarios', icon: 'pi pi-user-edit', routerLink: ['/Hacom/administracion/usuarios']}
                ]
            },
            {
                label: 'REPORTES', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
                items: [
                    {
                        label: 'GRAFICAS', icon: 'pi pi-fw pi-globe', badge: '2', badgeClass: 'p-badge-warning',
                        items: [
                            {label: 'Static', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                            {label: 'Component', icon: 'pi pi-fw pi-globe', routerLink: ['/landing']},
                            {label: 'Reporteria', icon: 'pi pi-file-o', routerLink: ['/Hacom/ussd/reporteria']},

                        ]
                    },

                ]
            },
        ];
    }
}
