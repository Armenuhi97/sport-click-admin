import { NgModule } from "@angular/core";
import { AdminViewComponent } from './admin.view';
import { Routes, RouterModule } from '@angular/router';

let adminRoutes: Routes = [{
    path: '', component: AdminViewComponent,
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'country' },
        { path: 'country', loadChildren: () => import('./country/country.module').then(m => m.CountryModule) },
        { path: ':id/liga', loadChildren: () => import('./liga/liga.module').then(m => m.LigaModule) }
    ]
}]
@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }