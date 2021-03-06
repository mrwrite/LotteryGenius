import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { MegamillionsPick } from '../models/megamillionpick';
import { UserPick } from '../models/userpick';
import { environment } from '../../environments/environment';
import { MegaWinnerViewModel } from '../viewmodels/megawinnerviewmodel';

@Injectable()
export class MegamillionsService {
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService, private httpClient: Http) { }

    public get_all_megamillions_picks() {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<MegamillionsPick[]>(this.url + "api/megamillion/AllMegaPicks", httpOptions);
    }

    public add_user_picks(picks: Array<UserPick>) {
        return this.httpClient.post(this.url + "api/megamillion/AddUserPicks",
            picks,
            {
                headers: new Headers({
                    "Authorization": "Bearer " + localStorage.getItem('token').toString()
                })
            });
    }

    public send_user_picks(picks: Array<UserPick>) {
        return this.httpClient.post(this.url + "api/megamillion/SendUserPicks",
            picks,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            });
    }

    public add_manual_user_pick(pick: UserPick) {
        return this.httpClient.post(this.url + "api/megamillion/AddManualUserPick",
            pick,
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

        return this.http.get<UserPick[]>(this.url + "api/megamillion/GetUserPicks/" + user_id, httpOptions);
    }

    public get_user_winning_picks(user_id: number) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<UserPick[]>(this.url + "api/megamillion/GetUserWinningPicks/" + user_id, httpOptions);
    }

    public show_user_winning_picks(user_id: number) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<MegaWinnerViewModel[]>(this.url + "api/megamillion/GetUserMegamillionWinners/" + user_id,
            httpOptions);
    }

    public delete_user_pick(id: number) {
        return this.httpClient.delete(this.url + "api/megamillion/DeleteUserPick/" + id,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            }).pipe();
    }
}