import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ToursViewComponent } from './tours.view';
let toursRoutes: Routes = [{ path: '', component: ToursViewComponent }]
@NgModule({
    imports: [RouterModule.forChild(toursRoutes)],
    exports: [RouterModule]
})
export class ToursRoutingModule { }