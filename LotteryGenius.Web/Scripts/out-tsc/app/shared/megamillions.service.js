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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { UserService } from '../shared/user.service';
import { environment } from '../../environments/environment';
var MegamillionsService = /** @class */ (function () {
    function MegamillionsService(http, userService, httpClient) {
        this.http = http;
        this.userService = userService;
        this.httpClient = httpClient;
        this.url = environment.apiUrl;
    }
    MegamillionsService.prototype.get_all_megamillions_picks = function () {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/megamillion/AllMegaPicks", httpOptions);
    };
    MegamillionsService.prototype.add_user_picks = function (picks) {
        return this.httpClient.post(this.url + "api/megamillion/AddUserPicks", picks, {
            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem('token').toString()
            })
        });
    };
    MegamillionsService.prototype.get_user_picks = function (user_id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/megamillion/GetUserPicks/" + user_id, httpOptions);
    };
    MegamillionsService.prototype.get_user_winning_picks = function (user_id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/megamillion/GetUserWinningPicks/" + user_id, httpOptions);
    };
    MegamillionsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, UserService, Http])
    ], MegamillionsService);
    return MegamillionsService;
}());
export { MegamillionsService };
//# sourceMappingURL=megamillions.service.js.map