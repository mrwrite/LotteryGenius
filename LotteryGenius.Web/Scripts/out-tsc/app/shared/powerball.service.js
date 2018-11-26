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
var PowerballService = /** @class */ (function () {
    function PowerballService(http, userService, httpClient) {
        this.http = http;
        this.userService = userService;
        this.httpClient = httpClient;
        this.url = environment.apiUrl;
    }
    PowerballService.prototype.get_all_powerball_picks = function () {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/powerball/AllPowerPicks", httpOptions);
    };
    PowerballService.prototype.add_user_picks = function (picks) {
        return this.httpClient.post(this.url + "api/powerball/AddUserPicks", picks, {
            headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        });
    };
    PowerballService.prototype.send_user_picks = function (picks) {
        return this.httpClient.post(this.url + "api/powerball/SendUserPicks", picks, {
            headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        });
    };
    PowerballService.prototype.add_manual_user_pick = function (pick) {
        return this.httpClient.post(this.url + "api/powerball/AddManualUserPick", pick, {
            headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        });
    };
    PowerballService.prototype.get_user_picks = function (user_id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/powerball/GetUserPicks/" + user_id, httpOptions);
    };
    PowerballService.prototype.get_user_winning_picks = function (user_id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/powerball/GetUserWinningPicks/" + user_id, httpOptions);
    };
    PowerballService.prototype.show_user_winning_picks = function (user_id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.http.get(this.url + "api/powerball/GetUserPowerballWinners/" + user_id, httpOptions);
    };
    PowerballService.prototype.delete_user_pick = function (id) {
        return this.httpClient.delete(this.url + "api/powerball/DeleteUserPick/" + id, {
            headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).pipe();
    };
    PowerballService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, UserService, Http])
    ], PowerballService);
    return PowerballService;
}());
export { PowerballService };
//# sourceMappingURL=powerball.service.js.map