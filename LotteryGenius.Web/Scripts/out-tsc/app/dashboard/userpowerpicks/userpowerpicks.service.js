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
import { User } from "../../models/user";
var UserpowerpicksService = /** @class */ (function () {
    function UserpowerpicksService(powerballService, userService) {
        this.powerballService = powerballService;
        this.userService = userService;
        this.userPicks$ = new Subject();
        this.user = new User();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
    }
    UserpowerpicksService.prototype.get_user_picks = function () {
        var _this = this;
        this.powerballService.get_user_picks(parseInt(this.user.iat)).subscribe(function (data) { return _this.userPicks$.next(data); });
    };
    UserpowerpicksService.prototype.notify_change_in_user_picks = function () {
        this.get_user_picks();
    };
    UserpowerpicksService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PowerballService, UserService])
    ], UserpowerpicksService);
    return UserpowerpicksService;
}());
export { UserpowerpicksService };
//# sourceMappingURL=userpowerpicks.service.js.map