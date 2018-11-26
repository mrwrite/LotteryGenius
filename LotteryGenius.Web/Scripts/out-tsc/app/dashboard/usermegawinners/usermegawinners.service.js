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
var UsermegawinnersService = /** @class */ (function () {
    function UsermegawinnersService(megamillionsService, userService) {
        this.megamillionsService = megamillionsService;
        this.userService = userService;
        this.megaWinners$ = new Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_mega_winners();
    }
    UsermegawinnersService.prototype.get_user_mega_winners = function () {
        var _this = this;
        this.megamillionsService.show_user_winning_picks(parseInt(this.user.iat))
            .subscribe(function (data) { return _this.megaWinners$.next(data); });
    };
    UsermegawinnersService.prototype.notify_change_in_mega_winners = function () {
        this.get_user_mega_winners();
    };
    UsermegawinnersService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MegamillionsService,
            UserService])
    ], UsermegawinnersService);
    return UsermegawinnersService;
}());
export { UsermegawinnersService };
//# sourceMappingURL=usermegawinners.service.js.map