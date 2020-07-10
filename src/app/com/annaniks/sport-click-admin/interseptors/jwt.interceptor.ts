// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, map, finalize, switchMap, take, filter } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { CookieService } from 'ngx-cookie-service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     private _updateTokenEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
//     private _updateTokenState: Observable<boolean>;
//     private _loading = false;

//     constructor(
//         private _httpClient: HttpClient,
//         private _cookieService: CookieService) {
//         this._updateTokenState = this._updateTokenEvent$.asObservable();
//     }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req)
//             .pipe(
//                 catchError((err) => {
//                     const status: number = err.status;
//                     const error = err.error;
//                     // console.log(err, req.url);

//                     if ((status === 401 || error.status === 401 || status === 0) && (req.url === environment.API_URL + 'token/refresh/' || req.url === environment.API_URL + 'client-login/')) {
//                         return throwError(err);
//                     }
//                     if (status === 401 || error.status === 401) {
//                         if (!this._loading) {
//                             this._updateToken();
//                         }
//                         return this._updateTokenState
//                             .pipe(
//                                 filter(token => token != null),
//                                 take(1),
//                                 switchMap((isUpdated) => {
//                                     if (!!isUpdated) {
//                                         return next.handle(this._setNewHeaders(req));
//                                     }
//                                     else if (isUpdated === false) {
//                                         return throwError(false);
//                                     }
//                                 }),
//                             );
//                     }
//                     return throwError(err);
//                 })
//             );
//     }

//     private _updateToken(): void {
//         let params = new HttpParams();
//         const refreshToken = this._cookieService.get('refreshToken');
//         params = params.set('authorization', 'false');
//         this._loading = true;
//         if (refreshToken) {
//             this._httpClient.post('token/refresh/', { refresh: this._cookieService.get('refreshToken') }, { params })
//                 .pipe(
//                     finalize(() => this._loading = false),
//                     map((data: any) => {
//                         const tokens = data.access;
//                         this._updateCookies(tokens);
//                         this._updateTokenEvent$.next(true);
//                     }),
//                     catchError((err) => {
//                         this._updateTokenEvent$.next(false);
//                         return throwError(false);
//                     })
//                 )
//                 .subscribe();
//         }
//         else {
//             this._loading = false;
//         }
//     }

//     private _updateCookies(data): void {
//         this._cookieService.set('accessToken', data, null, '/');
//     }

//     private _setNewHeaders(req: HttpRequest<any>): HttpRequest<any> {
//         let httpHeaders: HttpHeaders = req.headers;
//         httpHeaders = httpHeaders.delete('Authorization');
//         httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this._cookieService.get('accessToken') || '');
//         const clonedReq = req.clone({
//             headers: httpHeaders
//         });
//         return clonedReq;
//     }
// }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, finalize, switchMap, take, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private _updateTokenEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    private _updateTokenState: Observable<boolean>;
    private _loading: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _cookieService: CookieService,
        private _router: Router
    ) {
        this._updateTokenState = this._updateTokenEvent$.asObservable();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((err) => {
                    const status: number = err.status;
                    const error = err.error;
                    if ((status === 401 || error.status === 401 || status === 0) && req.url === environment.API_URL+'token/refresh/') { //ToDO fixing
                        this._router.navigate(['/login']);
                        return throwError(err);
                    }
                    if (status === 401 || error.status === 401) {
                        if (!this._loading) {
                            this._updateToken();
                        }
                        return this._updateTokenState
                            .pipe(
                                filter(token => token != null),
                                take(1),
                                switchMap((isUpdated) => {
                                    if (!!isUpdated) {
                                        return next.handle(this._setNewHeaders(req));
                                    }
                                    else if (isUpdated === false) {
                                        this._router.navigate(['/login']);
                                        return throwError(false);
                                    }
                                }),
                            )
                    }
                    return throwError(err);
                })
            );
    }

    private _updateToken(): void {
        let params = new HttpParams();
        let headers = new HttpHeaders();
        const refreshToken = this._cookieService.get('refreshToken');
        params = params.set('authorization', 'false');
        this._loading = true;
        if (refreshToken) {
            headers = headers.append('Authorization', 'Bearer ' + this._cookieService.get('refreshToken'));
            this._httpClient.post<any>('token/refresh/', {}, { params, headers })
                .pipe(
                    finalize(() => this._loading = false),
                    map((data) => {
                        const tokens = data;
                        this._updateCookies(tokens);
                        this._updateTokenEvent$.next(true);
                    }),
                    catchError((err) => {
                        console.log('errr');
                        this._router.navigate(['/login']);
                        this._updateTokenEvent$.next(false);
                        return throwError(false);
                    })
                )
                .subscribe();
        }
        else {
            this._loading = false;
            this._router.navigate(['/login']);
        }
    }

    private _updateCookies(data): void {
        this._cookieService.set('accessToken', data.access);
    }

    private _setNewHeaders(req: HttpRequest<any>): HttpRequest<any> {
        let httpHeaders: HttpHeaders = req.headers;
        httpHeaders = httpHeaders.delete('Authorization');
        httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this._cookieService.get('accessToken') || '')
        const clonedReq = req.clone({
            headers: httpHeaders
        })
        return clonedReq;
    }
}