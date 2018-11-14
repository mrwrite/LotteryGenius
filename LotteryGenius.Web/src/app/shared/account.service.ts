import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from "./user.service";
import { map, catchError } from "rxjs/operators";
import { Password } from '../models/password';
import { UserView } from '../models/user.view';
import { RegisterView } from '../models/register.view';
import { Role } from '../models/role';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private http: Http, private userService: UserService, private httpClient: HttpClient) { }

    private token: string = "";
    private tokenExpiration: Date;
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private url: string = environment.apiUrl;

    public get loginRequired(): boolean {
        return this.token.length === 0 || this.tokenExpiration > new Date();
    }

    public loggedIn() {
        var token = localStorage.getItem('token');
        return this.jwtHelper.isTokenExpired(token);
    }

    public login(creds) {
        return this.http.post(this.url + "api/account/createtoken", creds).pipe(map((res: Response) => res.json()));
    }

    public add_user(user: RegisterView) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            }),
        };

        return this.httpClient.post(this.url + "api/account/AddUser", user, httpOptions);
    }

    public getRoles() {
        return this.httpClient.get<Array<Role>>(this.url + "api/account/GetRoles").pipe();
    }

    public getUsers() {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };

        return this.httpClient.get<UserView[]>(this.url + "api/account/getusers", httpOptions);
    }

    public deleteUser(id: number) {
        return this.http.delete(this.url + "api/account/DeleteUser/" + id,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            }).pipe();
    }

    public changePassword(password: Password) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            }),
        };

        return this.httpClient.post(this.url + "api/account/passwordchange", password, httpOptions).pipe();
    }

    public logout() {
        this.userService.delete();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}