
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
const API_URL = environment.API_URL;
function checkIsRelativePath(path: string): boolean {
    return path.includes('assets');
}
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private _cookieService: CookieService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!checkIsRelativePath(req.url)) {
            let httpHeaders: HttpHeaders = req.headers;
            let params: HttpParams = (req.params) ? req.params : new HttpParams();
            if (req.params.get('isAuthorized') === 'true') {
                params = req.params.delete('isAuthorized');
                const token: string = this._cookieService.get('accessToken') || '';
                httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
            }
            const clonedRequest = req.clone({
                url: `${API_URL}${req.url}`,
                headers: httpHeaders,
                params
            });
            return next.handle(clonedRequest);
        }
        else {
            return next.handle(req);
        }

    }

}
