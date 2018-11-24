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
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { UserService } from '../../../shared/user.service';
import { AccountService } from '../../../shared/account.service';
import { PowerballService } from '../../../shared/powerball.service';
import { MegamillionsService } from '../../../shared/megamillions.service';
import { UserpowerpicksService } from '../../userpowerpicks/userpowerpicks.service';
import { UsermegapicksService } from '../../usermegapicks/usermegapicks.service';
import { UserPick } from '../../../models/userpick';
var UserpickentryComponent = /** @class */ (function () {
    function UserpickentryComponent(bsModalRef, userService, accountService, powerballService, megamillionsService, userpowerpicksService, usermegapicksService) {
        this.bsModalRef = bsModalRef;
        this.userService = userService;
        this.accountService = accountService;
        this.powerballService = powerballService;
        this.megamillionsService = megamillionsService;
        this.userpowerpicksService = userpowerpicksService;
        this.usermegapicksService = usermegapicksService;
        this.userPick = new UserPick();
    }
    UserpickentryComponent.prototype.ngOnInit = function () {
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    };
    UserpickentryComponent.prototype.addUserPick = function () {
        var _this = this;
        this.userPick.user_id = parseInt(this.user.iat);
        if (this.lottogame === "Powerball") {
            this.userPick.game_type = 'powerball';
            this.powerballService.add_manual_user_pick(this.userPick).subscribe(function (data) {
                _this.userpowerpicksService.notify_change_in_user_picks();
                _this.bsModalRef.hide();
            });
        }
        else {
            this.userPick.game_type = 'megamillions';
            this.megamillionsService.add_manual_user_pick(this.userPick).subscribe(function (data) {
                _this.usermegapicksService.notify_change_in_user_picks();
                _this.bsModalRef.hide();
            });
        }
    };
    UserpickentryComponent = __decorate([
        Component({
            selector: 'app-userpickentry',
            templateUrl: './userpickentry.component.html',
            styleUrls: ['./userpickentry.component.css']
        }),
        __metadata("design:paramtypes", [BsModalRef, UserService,
            AccountService,
            PowerballService,
            MegamillionsService,
            UserpowerpicksService,
            UsermegapicksService])
    ], UserpickentryComponent);
    return UserpickentryComponent;
}());
export { UserpickentryComponent };
//# sourceMappingURL=userpickentry.component.js.map