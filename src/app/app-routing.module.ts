import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from "./auth/auth.component";
import {MainComponent} from "./main/main.component";
import {canAccessAuth, canAccessHub} from "./app-routing.access";


const routes: Routes = [
    {path: 'auth', component: AuthComponent, canActivate: [canAccessAuth]},
    {path: 'hub', component: MainComponent, canActivate: [canAccessHub]},
    {path: '**', redirectTo: 'hub'}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
