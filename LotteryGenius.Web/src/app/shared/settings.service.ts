import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { UserPlayer } from '../models/userplayer';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService,
        private httpClient: Http) { }

    public get_user_player(user_id: number) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.http.get<UserPlayer>(this.url + "api/settings/GetUserPlayer/" + user_id, httpOptions);
    }

    public add_user_player(player: UserPlayer) {
        return this.httpClient.post(this.url + "api/settings/AddUserPlayer",
            player,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            });
    }

    public edit_user_player(player: UserPlayer) {
        return this.httpClient.put(this.url + "api/settings/EditPlayer",
            player,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            });
    }
}