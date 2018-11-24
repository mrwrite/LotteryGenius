var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { PowerballService } from "../../shared/powerball.service";
import { MegamillionsService } from "../../shared/megamillions.service";
import { PowerpicksService } from '../powerpicks/powerpicks.service';
import { MegapicksService } from '../megapicks/megapicks.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserpickentryComponent } from './userpickentry/userpickentry.component';
import { combineLatest } from "rxjs";
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, powerballService, megamillionsService, powerpicksService, megapicksService, modalService, changeDetection) {
        this.userService = userService;
        this.powerballService = powerballService;
        this.megamillionsService = megamillionsService;
        this.powerpicksService = powerpicksService;
        this.megapicksService = megapicksService;
        this.modalService = modalService;
        this.changeDetection = changeDetection;
        this.subscriptions = [];
        this.all_powerball_picks = new Array();
        this.all_megamillions_picks = new Array();
        this.user_picks = new Array();
        this.mega_user_picks = new Array();
        this.mega_user_winning_picks = new Array();
        this.power_user_winning_picks = new Array();
        this.powerpicksService.notify_change_in_user_picks();
        this.powerpicksService.notify_change_in_user_winning_picks();
        this.megapicksService.notify_change_in_user_picks();
        this.megapicksService.notify_change_in_user_winning_picks();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.powerballService.get_all_powerball_picks().subscribe(function (data) {
            _this.all_powerball_picks = data;
        });
        this.megamillionsService.get_all_megamillions_picks().subscribe(function (data) {
            _this.all_megamillions_picks = data;
        });
        this.powerpicksService.userpicks$.subscribe(function (data) {
            _this.user_picks = data;
        });
        this.megapicksService.userpicks$.subscribe(function (data) {
            _this.mega_user_picks = data;
        });
        this.megapicksService.userwinningpicks$.subscribe(function (data) {
            _this.mega_user_winning_picks = data;
        });
        this.powerpicksService.userwinningpicks$.subscribe(function (data) {
            _this.power_user_winning_picks = data;
        });
    };
    HomeComponent.prototype.openUserPickModal = function (gameType) {
        var _this = this;
        var _combine = combineLatest(this.modalService.onHide).subscribe(function () { return _this.changeDetection.markForCheck(); });
        this.subscriptions.push(this.modalService.onHide.subscribe(function (reason) {
            _this.powerpicksService.notify_change_in_user_picks();
            _this.megapicksService.notify_change_in_user_picks();
        }));
        this.subscriptions.push(_combine);
        var initialState = {
            lottoball: gameType === 'Powerball' ? 'Powerball' : 'Megaball',
            lottogame: gameType,
            styles: {
                'border-color': gameType === 'Powerball' ? 'red' : 'yellow'
            }
        };
        this.bsModalRef = this.modalService.show(UserpickentryComponent, { initialState: initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
    };
    HomeComponent = __decorate([
        Component({
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [UserService,
            PowerballService,
            MegamillionsService,
            PowerpicksService,
            MegapicksService,
            BsModalService,
            ChangeDetectorRef])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map