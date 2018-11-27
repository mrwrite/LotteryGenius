import { Component, OnInit, NgModule, AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { UserService } from "../../shared/user.service";
import { PowerballService } from "../../shared/powerball.service";
import { MegamillionsService } from "../../shared/megamillions.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserView } from "../../models/user.view";
import { PowerballPick } from "../../models/powerballpick";
import { MegamillionsPick } from "../../models/megamillionpick";
import { UserPick } from '../../models/userpick';
import { UserPlayer } from '../../models/userplayer';
import { PowerpicksService } from '../powerpicks/powerpicks.service';
import { MegapicksService } from '../megapicks/megapicks.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserpickentryComponent } from './userpickentry/userpickentry.component';
import { combineLatest, Subscription } from "rxjs";
import { UserpowerpicksService } from '../userpowerpicks/userpowerpicks.service';
import { UsermegapicksService } from '../usermegapicks/usermegapicks.service';
import { SettingsService } from '../../shared/settings.service';
import { HomesettingsService } from './homesettings.service';

export let browserRefresh = false;

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public user: User;
    public users: Array<UserView>;
    public user_player: UserPlayer;
    public all_powerball_picks: Array<PowerballPick>;
    public all_megamillions_picks: Array<MegamillionsPick>;
    public user_picks: Array<UserPick>;
    public mega_user_picks: Array<UserPick>;
    public mega_user_winning_picks: Array<UserPick>;
    public power_user_winning_picks: Array<UserPick>;
    bsModalRef: BsModalRef;
    subscriptions: Subscription[] = [];
    public pick_id: number;
    public game_type: string;
    public user_player_view: UserView;
    public showUsersSelect: boolean = false;
    public player_id: number = -1;

    constructor(private userService: UserService,
        private powerballService: PowerballService,
        private megamillionsService: MegamillionsService,
        private powerpicksService: PowerpicksService,
        private megapicksService: MegapicksService,
        private modalService: BsModalService,
        private changeDetection: ChangeDetectorRef,
        private userpowerpicksService: UserpowerpicksService,
        private usermegapicksService: UsermegapicksService,
        private settingsService: SettingsService,
        private homesettingsService: HomesettingsService,
        private accountService: AccountService) {
        this.users = new Array<UserView>();
        this.all_powerball_picks = new Array<PowerballPick>();
        this.all_megamillions_picks = new Array<MegamillionsPick>();
        this.user_picks = new Array<UserPick>();
        this.mega_user_picks = new Array<UserPick>();
        this.mega_user_winning_picks = new Array<UserPick>();
        this.power_user_winning_picks = new Array<UserPick>();
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

    async ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        await this.initializePlayers();

        await this.powerpicksService.powerballpicks$.subscribe(data => {
            this.all_powerball_picks = data;
        });

        await this.megapicksService.megamillionpicks$.subscribe(data => {
            this.all_megamillions_picks = data;
        });

        await this.powerpicksService.userpicks$.subscribe(data => {
            this.user_picks = data;
        });

        await this.megapicksService.userpicks$.subscribe(data => {
            this.mega_user_picks = data;
        });

        await this.megapicksService.userwinningpicks$.subscribe(data => {
            this.mega_user_winning_picks = data;
        });

        await this.powerpicksService.userwinningpicks$.subscribe(data => {
            this.power_user_winning_picks = data;
        });
    }

    openUserPickModal(gameType: string) {
        const _combine = combineLatest(this.modalService.onHide).subscribe(() => this.changeDetection.markForCheck());

        this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
            this.powerpicksService.notify_change_in_user_picks();
            this.megapicksService.notify_change_in_user_picks();
        }));

        this.subscriptions.push(_combine);

        const initialState = {
            lottoball: gameType === 'Powerball' ? 'Powerball' : 'Megaball',
            lottogame: gameType,
            styles: {
                'border-color': gameType === 'Powerball' ? 'red' : 'yellow'
            }
        };

        this.bsModalRef = this.modalService.show(UserpickentryComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
    }

    open_delete_modal(template: TemplateRef<any>, id: number, type: string) {
        this.pick_id = id;
        this.game_type = type;
        this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
    }

    confirm_user_pick_delete() {
        if (this.game_type === 'powerball') {
            this.powerballService.delete_user_pick(this.pick_id).subscribe(data => {
                this.bsModalRef.hide();
                this.powerpicksService.notify_change_in_user_picks();
            });
        } else {
            this.megamillionsService.delete_user_pick(this.pick_id).subscribe(data => {
                this.bsModalRef.hide();
                this.megapicksService.notify_change_in_user_picks();
            });
        }
    }

    setUserPlayer() {
        if (this.player_id < 1) {
            var newPlayer = new UserPlayer();

            newPlayer.user_id = parseInt(this.user.iat);
            newPlayer.player_id = this.player_id;

            this.settingsService.add_user_player(newPlayer).subscribe(data => {
                this.homesettingsService.notify_change_in_user_player();
            });
        } else {
            var editedPlayer = new UserPlayer();
            editedPlayer.user_id = parseInt(this.user.iat);
            editedPlayer.player_id = this.player_id;

            this.settingsService.edit_user_player(editedPlayer).subscribe(data => {
                this.homesettingsService.notify_change_in_user_player();
                this.showUsersSelect = false;
            });
        }
    }

    async initializePlayers() {
        await this.homesettingsService.users$.subscribe(data => {
            this.users = data;

            this.settingsService.get_user_player(parseInt(this.user.iat)).toPromise().then(data => {
                this.user_player = data;
                if (this.user_player != null && this.users.length > 0) {
                    this.player_id = this.user_player.user_id;
                    this.user_player_view = this.users.find(x => x.id === this.user_player.player_id);
                }
            });
        });
    }
}