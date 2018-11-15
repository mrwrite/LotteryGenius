import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { MegamillionsPick } from '../models/megamillionpick';
import { environment } from '../../environments/environment';

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
}