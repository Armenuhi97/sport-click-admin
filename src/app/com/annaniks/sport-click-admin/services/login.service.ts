import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {
    
    constructor(private _httpClient: HttpClient, private _cookieService: CookieService) { }

    public login(userData) {
        return this._httpClient.post('', userData);
    }
 }