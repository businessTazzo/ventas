import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { HeladosComponent } from './pages/ventas/helados/helados.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: 'Hacom', component: AppMainComponent,
            //     children: [
            //         {path: 'administracion/usuarios', component: UsuariosComponent}
            //     ]
            // },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            //{path: '', component: UssdcreateComponent},
            // {path: '', component: AppLoginComponent},
            {path: '', component: HeladosComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
