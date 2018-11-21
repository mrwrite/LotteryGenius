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
import { UserService } from "../../shared/user.service";
var UsermegapicksService = /** @class */ (function () {
    function UsermegapicksService(megamillionService, userService) {
        this.megamillionService = megamillionService;
        this.userService = userService;
        this.userPicks$ = new Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
    }
    UsermegapicksService.prototype.get_user_picks = function () {
        var _this = this;
        this.megamillionService.get_user_picks(parseInt(this.user.iat)).subscribe(function (data) { return _this.userPicks$.next(data); });
    };
    UsermegapicksService.prototype.notify_change_in_user_picks = function () {
        this.get_user_picks();
    };
    UsermegapicksService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MegamillionsService, UserService])
    ], UsermegapicksService);
    return UsermegapicksService;
}());
export { UsermegapicksService };
//# sourceMappingURL=usermegapicks.service.js.map