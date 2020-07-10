import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './login.view';
let loginRoutes: Routes = [{ path: '', component: LoginViewComponent }]
@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }