import { NgModule } from "@angular/core";
import { AdminViewComponent } from './admin.view';
import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [AdminViewComponent],
    imports: [AdminRoutingModule,SharedModule]
})
export class AdminModule { }