import { NgModule } from "@angular/core";
import { LigaViewComponent } from './liga.view';
import { SharedModule } from '../../../shared/shared.module';
import { LigaRoutingModule } from './liga.routing.module';

@NgModule({
    declarations: [LigaViewComponent],
    imports: [LigaRoutingModule, SharedModule]
})
export class LigaModule { }