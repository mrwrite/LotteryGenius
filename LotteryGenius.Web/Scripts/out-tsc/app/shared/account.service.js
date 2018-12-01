var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from "./user.service";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
var AccountService = /** @class */ (function () {
    function AccountService(http, userService, httpClient) {
        this.http = http;
        this.userService = userService;
        this.httpClient = httpClient;
        this.token = "";
        this.jwtHelper = new JwtHelperService();
        this.url = environment.apiUrl;
    }
    Object.defineProperty(AccountService.prototype, "loginRequired", {
        get: function () {
            return this.token.length === 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.loggedIn = function () {
        var token = localStorage.getItem('token');
        return this.jwtHelper.isTokenExpired(token);
    };
    AccountService.prototype.login = function (creds) {
        return this.http.post(this.url + "api/account/createtoken", creds).pipe(map(function (res) { return res.json(); }));
    };
    AccountService.prototype.add_user = function (user) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            }),
        };
        return this.httpClient.post(this.url + "api/account/AddUser", user, httpOptions);
    };
    AccountService.prototype.getRoles = function () {
        return this.httpClient.get(this.url + "api/account/GetRoles").pipe();
    };
    AccountService.prototype.getUsers = function () {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get(this.url + "api/account/getusers", httpOptions);
    };
    AccountService.prototype.deleteUser = function (id) {
        return this.http.delete(this.url + "api/account/DeleteUser/" + id, {
            headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).pipe();
    };
    AccountService.prototype.changePassword = function (password) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            }),
        };
        return this.httpClient.post(this.url + "api/account/passwordchange", password, httpOptions).pipe();
    };
    AccountService.prototype.resetUserPassword = function (id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            }),
        };
        return this.httpClient.post(this.url + "api/account/ResetPassword/", id, httpOptions).pipe();
    };
    AccountService.prototype.logout = function () {
        this.userService.delete();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    AccountService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http, UserService, HttpClient])
    ], AccountService);
    return AccountService;
}());
export { AccountService };
//# sourceMappingURL=account.service.js.map