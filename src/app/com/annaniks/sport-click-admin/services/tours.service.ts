import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ToursService {
    constructor(private _httpClient: HttpClient) { }
    public getTour(ligaId: number) {
        return this._httpClient.get(`tur/?liga=${ligaId}`);
    }
    public getMatch(tourId: number) {
        let reqUrl = `match/?tur=${tourId}`;       
        return this._httpClient.get(reqUrl);
    }
}