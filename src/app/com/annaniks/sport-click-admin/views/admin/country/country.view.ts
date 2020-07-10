import { Component } from "@angular/core";
import { CountryService } from '../../../services/country.service';
import { LoadingService } from '../../../services';
import { Country, ServerResponse } from '../../../models/model';
import { MatDialog } from '@angular/material/dialog';
import { AddCountryModalComponent } from '../../../modals';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-country-view',
    templateUrl: 'country.view.html',
    styleUrls: ['country.view.scss']
})
export class CountryViewComponent {
    public countries: Country[] = [];
    unsubscribe$ = new Subject<void>()

    constructor(private _countryService: CountryService,
        private _matDialog:MatDialog,
        private _loadingService: LoadingService) { }
    ngOnInit() {
        this._getCountries()
    }
    private _getCountries() {
        this._loadingService.showLoading()
        this._countryService.getAllCountries().pipe(takeUntil(this.unsubscribe$),finalize(() => { this._loadingService.hideLoading() })).subscribe((data: ServerResponse<Country[]>) => {
            this.countries = data.results
        })
    }
    public addCountry(){
        const dialog=this._matDialog.open(AddCountryModalComponent,{
            width:'700px'
        })
        dialog.afterClosed().subscribe((data)=>{
            if(data){
                this._getCountries()
            }
        })
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}