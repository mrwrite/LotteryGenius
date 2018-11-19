var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { PowerpicksService } from './powerpicks.service';
import { PowerballService } from '../../shared/powerball.service';
import { UserPick } from '../../models/userpick';
export var browserRefresh = false;
var PowerpicksComponent = /** @class */ (function () {
    function PowerpicksComponent(powerpicksService, accountService, userService, router, powerballService) {
        this.powerpicksService = powerpicksService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.powerballService = powerballService;
        this.powerballPicks = new Array();
        this.powerpicksService.notify_change_in_powerball_picks();
    }
    PowerpicksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.powerpicksService.powerballpicks$.subscribe(function (data) {
            _this.powerballPicks = data;
        });
    };
    PowerpicksComponent.prototype.add_user_pick = function (pick) {
        var _this = this;
        var user_picks = new Array();
        var user_pick = new UserPick;
        user_pick.user_id = parseInt(this.user.iat);
        user_pick.pick_id = pick.id;
        user_pick.game_type = 'powerball';
        user_pick.ball1 = pick.ball1;
        user_pick.ball2 = pick.ball2;
        user_pick.ball3 = pick.ball3;
        user_pick.ball4 = pick.ball4;
        user_pick.ball5 = pick.ball5;
        user_pick.lottoball = pick.powerball;
        user_picks.push(user_pick);
        this.powerballService.add_user_picks(user_picks).subscribe(function (data) {
            _this.powerpicksService.notify_change_in_powerball_picks();
        });
    };
    PowerpicksComponent = __decorate([
        Component({
            selector: 'powerpicks',
            templateUrl: './powerpicks.component.html',
            styleUrls: ['./powerpicks.component.css']
        }),
        __metadata("design:paramtypes", [PowerpicksService,
            AccountService,
            UserService,
            Router,
            PowerballService])
    ], PowerpicksComponent);
    return PowerpicksComponent;
}());
export { PowerpicksComponent };
//# sourceMappingURL=powerpicks.component.js.map