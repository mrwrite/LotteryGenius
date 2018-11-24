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
import { PowerballService } from '../../shared/powerball.service';
import { Subject } from 'rxjs';
import { UserService } from "../../shared/user.service";
var PowerpicksService = /** @class */ (function () {
    function PowerpicksService(powerballService, userService) {
        this.powerballService = powerballService;
        this.userService = userService;
        this.powerballpicks$ = new Subject();
        this.userpicks$ = new Subject();
        this.userwinningpicks$ = new Subject();
        this.get_powerball_picks();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
        this.get_user_winning_picks();
    }
    PowerpicksService.prototype.get_user_picks = function () {
        var _this = this;
        this.powerballService.get_user_picks(parseInt(this.user.iat)).subscribe(function (data) { return _this.userpicks$.next(data); });
    };
    PowerpicksService.prototype.get_user_winning_picks = function () {
        var _this = this;
        this.powerballService.get_user_winning_picks(parseInt(this.user.iat))
            .subscribe(function (data) { return _this.userwinningpicks$.next(data); });
    };
    PowerpicksService.prototype.get_powerball_picks = function () {
        var _this = this;
        this.powerballService.get_all_powerball_picks().subscribe(function (data) { return _this.powerballpicks$.next(data); });
    };
    PowerpicksService.prototype.notify_change_in_powerball_picks = function () {
        this.get_powerball_picks();
    };
    PowerpicksService.prototype.notify_change_in_user_picks = function () {
        this.get_user_picks();
    };
    PowerpicksService.prototype.notify_change_in_user_winning_picks = function () {
        this.get_user_winning_picks();
    };
    PowerpicksService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PowerballService, UserService])
    ], PowerpicksService);
    return PowerpicksService;
}());
export { PowerpicksService };
//# sourceMappingURL=powerpicks.service.js.map