import { NgModule } from "@angular/core";
import { LoginViewComponent } from './login.view';
import { LoginRoutingModule } from './login.routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [LoginViewComponent],
    imports: [LoginRoutingModule, SharedModule]
})
export class LoginModule { }