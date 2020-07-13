import { NgModule } from "@angular/core";
import { ToursViewComponent } from './tours.view';
import { ToursRoutingModule } from './tours.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ToursService } from '../../../services/tours.service';

@NgModule({
    declarations: [ToursViewComponent],
    imports: [ToursRoutingModule, SharedModule],
    providers: [ToursService]
})
export class ToursModule { }