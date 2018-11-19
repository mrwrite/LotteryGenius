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
import { MegapicksService } from './megapicks.service';
import { MegamillionsService } from '../../shared/megamillions.service';
import { UserPick } from '../../models/userpick';
export var browserRefresh = false;
var MegapicksComponent = /** @class */ (function () {
    function MegapicksComponent(megapicksService, accountService, userService, router, megamillionsService) {
        this.megapicksService = megapicksService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.megamillionsService = megamillionsService;
        this.megamillionPicks = new Array();
        this.megapicksService.notify_change_in_megamillion_picks();
    }
    MegapicksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.megapicksService.megamillionpicks$.subscribe(function (data) {
            _this.megamillionPicks = data;
        });
    };
    MegapicksComponent.prototype.add_user_pick = function (pick) {
        var _this = this;
        var user_picks = new Array();
        var user_pick = new UserPick;
        user_pick.user_id = parseInt(this.user.iat);
        user_pick.pick_id = pick.id;
        user_pick.game_type = 'megamillions';
        user_pick.ball1 = pick.ball1;
        user_pick.ball2 = pick.ball2;
        user_pick.ball3 = pick.ball3;
        user_pick.ball4 = pick.ball4;
        user_pick.ball5 = pick.ball5;
        user_pick.lottoball = pick.megaball;
        user_picks.push(user_pick);
        this.megamillionsService.add_user_picks(user_picks).subscribe(function (data) {
            _this.megapicksService.notify_change_in_megamillion_picks();
        });
    };
    MegapicksComponent = __decorate([
        Component({
            selector: 'app-megapicks',
            templateUrl: './megapicks.component.html',
            styleUrls: ['./megapicks.component.css']
        }),
        __metadata("design:paramtypes", [MegapicksService,
            AccountService,
            UserService,
            Router,
            MegamillionsService])
    ], MegapicksComponent);
    return MegapicksComponent;
}());
export { MegapicksComponent };
//# sourceMappingURL=megapicks.component.js.map