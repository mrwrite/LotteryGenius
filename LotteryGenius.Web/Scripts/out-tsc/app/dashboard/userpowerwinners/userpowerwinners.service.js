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
import { UserService } from '../../shared/user.service';
var UserpowerwinnersService = /** @class */ (function () {
    function UserpowerwinnersService(powerballService, userService) {
        this.powerballService = powerballService;
        this.userService = userService;
        this.powerWinners$ = new Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_power_winners();
    }
    UserpowerwinnersService.prototype.get_user_power_winners = function () {
        var _this = this;
        this.powerballService.show_user_winning_picks(parseInt(this.user.iat))
            .subscribe(function (data) { return _this.powerWinners$.next(data); });
    };
    UserpowerwinnersService.prototype.notify_change_in_power_winners = function () {
        this.get_user_power_winners();
    };
    UserpowerwinnersService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PowerballService, UserService])
    ], UserpowerwinnersService);
    return UserpowerwinnersService;
}());
export { UserpowerwinnersService };
//# sourceMappingURL=userpowerwinners.service.js.map