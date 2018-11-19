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
import { MegamillionsService } from '../../shared/megamillions.service';
import { Subject } from 'rxjs';
import { UserService } from '../../shared/user.service';
var MegapicksService = /** @class */ (function () {
    function MegapicksService(megamillionService, userService) {
        this.megamillionService = megamillionService;
        this.userService = userService;
        this.megamillionpicks$ = new Subject();
        this.userpicks$ = new Subject();
        this.userwinningpicks$ = new Subject();
        this.get_megamillions_picks();
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
    MegapicksService.prototype.get_user_picks = function () {
        var _this = this;
        this.megamillionService.get_user_picks(parseInt(this.user.iat)).subscribe(function (data) { return _this.userpicks$.next(data); });
    };
    MegapicksService.prototype.get_user_winning_picks = function () {
        var _this = this;
        this.megamillionService.get_user_winning_picks(parseInt(this.user.iat))
            .subscribe(function (data) { return _this.userwinningpicks$.next(data); });
    };
    MegapicksService.prototype.get_megamillions_picks = function () {
        var _this = this;
        this.megamillionService.get_all_megamillions_picks().subscribe(function (data) { return _this.megamillionpicks$.next(data); });
    };
    MegapicksService.prototype.notify_change_in_megamillion_picks = function () {
        this.get_megamillions_picks();
    };
    MegapicksService.prototype.notify_change_in_user_picks = function () {
        this.get_user_picks();
    };
    MegapicksService.prototype.notify_change_in_user_winning_picks = function () {
        this.get_user_winning_picks();
    };
    MegapicksService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MegamillionsService,
            UserService])
    ], MegapicksService);
    return MegapicksService;
}());
export { MegapicksService };
//# sourceMappingURL=megapicks.service.js.map