import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

let appRoutes: Routes = [
    { path: '', loadChildren: () => import('./com/annaniks/sport-click-admin/views/admin/admin.module').then(m => m.AdminModule) },
    { path: 'login', loadChildren: () => import('./com/annaniks/sport-click-admin/views/login/login.module').then(m => m.LoginModule) }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }