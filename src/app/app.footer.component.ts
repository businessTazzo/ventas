import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer flex align-items-center p-2 shadow-2 w-full">
            <span>
            Copyright © 2022
            <img id="footer-logo" style="width: 50px; transform: translateY(25%)" class="ml-1"
            [src]="'assets/layout/images/hacom.png'" alt="footer-logo">
            . Todos los derechos reservados.
            </span>
        </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) {}
}
