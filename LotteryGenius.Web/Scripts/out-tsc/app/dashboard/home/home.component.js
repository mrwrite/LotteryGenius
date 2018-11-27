var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { UserService } from "../../shared/user.service";
import { PowerballService } from "../../shared/powerball.service";
import { MegamillionsService } from "../../shared/megamillions.service";
import { UserView } from "../../models/user.view";
import { UserPlayer } from '../../models/userplayer';
import { PowerpicksService } from '../powerpicks/powerpicks.service';
import { MegapicksService } from '../megapicks/megapicks.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserpickentryComponent } from './userpickentry/userpickentry.component';
import { combineLatest } from "rxjs";
import { UserpowerpicksService } from '../userpowerpicks/userpowerpicks.service';
import { UsermegapicksService } from '../usermegapicks/usermegapicks.service';
import { SettingsService } from '../../shared/settings.service';
import { HomesettingsService } from './homesettings.service';
export var browserRefresh = false;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, powerballService, megamillionsService, powerpicksService, megapicksService, modalService, changeDetection, userpowerpicksService, usermegapicksService, settingsService, homesettingsService, accountService) {
        this.userService = userService;
        this.powerballService = powerballService;
        this.megamillionsService = megamillionsService;
        this.powerpicksService = powerpicksService;
        this.megapicksService = megapicksService;
        this.modalService = modalService;
        this.changeDetection = changeDetection;
        this.userpowerpicksService = userpowerpicksService;
        this.usermegapicksService = usermegapicksService;
        this.settingsService = settingsService;
        this.homesettingsService = homesettingsService;
        this.accountService = accountService;
        this.subscriptions = [];
        this.showUsersSelect = false;
        this.player_id = -1;
        this.users = new Array();
        this.all_powerball_picks = new Array();
        this.all_megamillions_picks = new Array();
        this.user_picks = new Array();
        this.mega_user_picks = new Array();
        this.mega_user_winning_picks = new Array();
        this.power_user_winning_picks = new Array();
        this.powerpicksService.notify_change_in_user_picks();
        this.powerpicksService.notify_change_in_user_winning_picks();
        this.powerpicksService.notify_change_in_powerball_picks();
        this.megapicksService.notify_change_in_user_picks();
        this.megapicksService.notify_change_in_user_winning_picks();
        this.megapicksService.notify_change_in_megamillion_picks();
        this.homesettingsService.notify_change_in_users();
        this.user_player = new UserPlayer();
        this.user_player_view = new UserView();
        this.initializePlayers();
    }
    HomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = this.userService.get();
                        if (newUser) {
                            this.user = newUser;
                        }
                        else {
                            this.user = JSON.parse(localStorage.getItem('user'));
                        }
                        return [4 /*yield*/, this.initializePlayers()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.powerpicksService.powerballpicks$.subscribe(function (data) {
                                _this.all_powerball_picks = data;
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.megapicksService.megamillionpicks$.subscribe(function (data) {
                                _this.all_megamillions_picks = data;
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.powerpicksService.userpicks$.subscribe(function (data) {
                                _this.user_picks = data;
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.megapicksService.userpicks$.subscribe(function (data) {
                                _this.mega_user_picks = data;
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.megapicksService.userwinningpicks$.subscribe(function (data) {
                                _this.mega_user_winning_picks = data;
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.powerpicksService.userwinningpicks$.subscribe(function (data) {
                                _this.power_user_winning_picks = data;
                            })];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
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
    HomeComponent.prototype.open_delete_modal = function (template, id, type) {
        this.pick_id = id;
        this.game_type = type;
        this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
    };
    HomeComponent.prototype.confirm_user_pick_delete = function () {
        var _this = this;
        if (this.game_type === 'powerball') {
            this.powerballService.delete_user_pick(this.pick_id).subscribe(function (data) {
                _this.bsModalRef.hide();
                _this.powerpicksService.notify_change_in_user_picks();
            });
        }
        else {
            this.megamillionsService.delete_user_pick(this.pick_id).subscribe(function (data) {
                _this.bsModalRef.hide();
                _this.megapicksService.notify_change_in_user_picks();
            });
        }
    };
    HomeComponent.prototype.setUserPlayer = function () {
        var _this = this;
        if (this.player_id < 1) {
            var newPlayer = new UserPlayer();
            newPlayer.user_id = parseInt(this.user.iat);
            newPlayer.player_id = this.player_id;
            this.settingsService.add_user_player(newPlayer).subscribe(function (data) {
                _this.homesettingsService.notify_change_in_user_player();
            });
        }
        else {
            var editedPlayer = new UserPlayer();
            editedPlayer.user_id = parseInt(this.user.iat);
            editedPlayer.player_id = this.player_id;
            this.settingsService.edit_user_player(editedPlayer).subscribe(function (data) {
                _this.homesettingsService.notify_change_in_user_player();
                _this.showUsersSelect = false;
            });
        }
    };
    HomeComponent.prototype.initializePlayers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.homesettingsService.users$.subscribe(function (data) {
                            _this.users = data;
                            _this.settingsService.get_user_player(parseInt(_this.user.iat)).toPromise().then(function (data) {
                                _this.user_player = data;
                                if (_this.user_player != null && _this.users.length > 0) {
                                    _this.player_id = _this.user_player.user_id;
                                    _this.user_player_view = _this.users.find(function (x) { return x.id === _this.user_player.player_id; });
                                }
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
            ChangeDetectorRef,
            UserpowerpicksService,
            UsermegapicksService,
            SettingsService,
            HomesettingsService,
            AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map