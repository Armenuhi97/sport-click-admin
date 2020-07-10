import { Component } from "@angular/core";
import { Liga, ServerResponse, Country } from '../../../models/model';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService, AppService } from '../../../services';
import { AddCountryModalComponent } from '../../../modals';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { CountryService } from '../../../services/country.service';

@Component({
    selector: 'app-liga-view',
    templateUrl: 'liga.view.html',
    styleUrls: ['liga.view.scss']
})
export class LigaViewComponent {
    public ligas: Liga[] = [];
    unsubscribe$ = new Subject<void>()
    private _routeSub: Subscription;
    private _countryId: number;
    constructor(
        private _matDialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
        private _appService: AppService,
        private _countryService: CountryService,
        private _loadingService: LoadingService) {
        this._routeSub = this._activatedRoute.params.subscribe(params => {
            this._countryId = params.id
        });
    }
    ngOnInit() {
        this._getCountries()
    }
    private _getCountries() {
        this._loadingService.showLoading()
        this._countryService.getAllCountries().pipe(takeUntil(this.unsubscribe$), finalize(() => { this._loadingService.hideLoading() })).subscribe((data: ServerResponse<Country[]>) => {            
            this.ligas = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(data.results, 'id', +this._countryId), 0), 'country_liga')
        })
    }
    public addCountry() {
        const dialog = this._matDialog.open(AddCountryModalComponent, {
            width: '700px',
            data: { url: '' }
        })
        dialog.afterClosed().subscribe((data) => {
            if (data) {
                this._getCountries()
            }
        })
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this._routeSub.unsubscribe()
    }
}