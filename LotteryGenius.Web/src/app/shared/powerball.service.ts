import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { PowerballPick } from '../models/powerballpick';
import { UserPick } from '../models/userpick';
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

    public add_user_picks(picks: Array<UserPick>) {
        return this.httpClient.post(this.url + "api/powerball/AddUserPicks",
            picks,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            });
    }

    public get_user_picks(user_id: number) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<UserPick[]>(this.url + "api/powerball/GetUserPicks/" + user_id, httpOptions);
    }

    public get_user_winning_picks(user_id: number) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<UserPick[]>(this.url + "api/powerball/GetUserWinningPicks/" + user_id, httpOptions);
    }
}