import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

Injectable()
export class AccountService {
    constructor(private http: Http) { }

    private token: string;
    private tokenExpiration: Date;
    private jwtHelper: JwtHelper = new JwtHelper();
    private baseUrl: string = "http://localhost:6000/";

    public get loginRequired(): boolean {
        return this.token.length === 0 || this.tokenExpiration > new Date();
    }

    public loggedIn() {
        return tokenNotExpired();
    }

    public login(creds) {
        return this.http.post(this.baseUrl + "api/account/createtoken", creds)
            .map((res: Response) => res.json());
    }

    public logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    public get_users() {
    }
}