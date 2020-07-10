import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    private _loaderSubject = new Subject<{ show: boolean }>();
    private _loaderState = this._loaderSubject.asObservable();

    constructor() { }

    public showLoading(): void {
        setTimeout(() => {
            this._loaderSubject.next({ show: true });
        });
    }

    public hideLoading(): void {
        setTimeout(() => {
            this._loaderSubject.next({ show: false });
        });
    }

    public getLoaderState(): Observable<{ show: boolean }> {
        return this._loaderState;
    }
}
