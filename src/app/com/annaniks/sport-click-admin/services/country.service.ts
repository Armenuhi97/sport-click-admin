import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private _httpClient: HttpClient) { }

    public getAllCountries(): any {// Observable<ApiType<Country>>
        return this._httpClient.get(`country/?page_size=200`);
    }
}