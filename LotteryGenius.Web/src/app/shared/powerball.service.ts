import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { PowerballPick } from '../models/powerballpick';
import { environment } from '../../environments/environment';

@Injectable()
export class PowerballService {
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService, private httpClient: Http) { }

    public get_all_powerball_picks() {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<PowerballPick[]>(this.url + "api/powerball/AllPowerPicks", httpOptions);
    }
}