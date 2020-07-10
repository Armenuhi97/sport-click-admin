import { NgModule } from "@angular/core";
import { CountryViewComponent } from './country.view';
import { CountryRoutingModule } from './country.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { AddCountryModalComponent } from '../../../modals';

@NgModule({
    declarations: [CountryViewComponent,AddCountryModalComponent],
    entryComponents:[,AddCountryModalComponent],
    imports: [CountryRoutingModule, SharedModule]
})
export class CountryModule { }