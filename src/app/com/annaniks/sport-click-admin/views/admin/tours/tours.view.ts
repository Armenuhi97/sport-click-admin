import { Component } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { ServerResponse } from '../../../models/model';
import { ToursService } from '../../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService, AppService } from '../../../services';
import * as moment from 'moment';
@Component({
    selector: 'app-tours-view',
    templateUrl: 'tours.view.html',
    styleUrls: ['tours.view.scss']
})
export class ToursViewComponent {
    private _ligaId: number;
    private _routeSub: Subscription;
    public tours = [];
    public selectedTour;
    private _unsubscribe$ = new Subject<void>();
    public matches=[];
    constructor(private _toursService: ToursService, private _activatedRoute: ActivatedRoute,
        private _appService:AppService,
        private _loadingService: LoadingService) {
        this._routeSub = this._activatedRoute.params.subscribe(params => {
            this._ligaId = params.id
        });
    }
    ngOnInit() {
        this._getTours()
    }
    private _getTours() {
        this._loadingService.showLoading()
        return this._toursService.getTour(this._ligaId).pipe(
            finalize(() => { this._loadingService.hideLoading() }),
            takeUntil(this._unsubscribe$),
            switchMap((data: ServerResponse<any[]>) => {
                this.tours = data.results;
                if (this.tours && this.tours.length) {
                    this.selectedTour = this.tours[0];
                    return this._getMatches(this.tours[0].id)
                } else {
                    this.selectedTour = null;
                    return of()
                }
            })).subscribe();
    }
    private _getMatches(tourId: number) {
        return this._toursService.getMatch(tourId)
            .pipe(
                map((data: ServerResponse<any[]>) => {
                    this.matches = data.results;
                })
            )
    }
    public selectTour(tour) {
        this.selectedTour = tour;
        this._getMatches(tour.id).pipe(
            finalize(() => { this._loadingService.hideLoading() }),
            takeUntil(this._unsubscribe$)
        ).subscribe()
    }
    public convertDate(date: string): string {
        const timeZone = moment.tz.guess();
        return this._appService.convertDate(timeZone, date);
    }
    ngOnDestroy() {
        this._routeSub.unsubscribe();
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}