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
import { HomesettingsService } from './homesettings.service';

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

    constructor(private userService: UserService,
        private powerballService: PowerballService,
        private megamillionsService: MegamillionsService,
        private powerpicksService: PowerpicksService,
        private megapicksService: MegapicksService,
        private modalService: BsModalService,
        private changeDetection: ChangeDetectorRef,
        private userpowerpicksService: UserpowerpicksService,
        private usermegapicksService: UsermegapicksService,
        private homesettingsService: HomesettingsService,
        private accountService: AccountService) {
        this.all_powerball_picks = new Array<PowerballPick>();
        this.all_megamillions_picks = new Array<MegamillionsPick>();
        this.user_picks = new Array<UserPick>();
        this.mega_user_picks = new Array<UserPick>();
        this.mega_user_winning_picks = new Array<UserPick>();
        this.power_user_winning_picks = new Array<UserPick>();
        this.powerpicksService.notify_change_in_user_picks();
        this.powerpicksService.notify_change_in_user_winning_picks();
        this.megapicksService.notify_change_in_user_picks();
        this.megapicksService.notify_change_in_user_winning_picks();
        this.user_player = new UserPlayer();
        this.users = new Array<UserView>();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.powerballService.get_all_powerball_picks().subscribe(data => {
            this.all_powerball_picks = data;
        });

        this.megamillionsService.get_all_megamillions_picks().subscribe(data => {
            this.all_megamillions_picks = data;
        });

        this.powerpicksService.userpicks$.subscribe(data => {
            this.user_picks = data;
        });

        this.megapicksService.userpicks$.subscribe(data => {
            this.mega_user_picks = data;
        });

        this.megapicksService.userwinningpicks$.subscribe(data => {
            this.mega_user_winning_picks = data;
        });

        this.powerpicksService.userwinningpicks$.subscribe(data => {
            this.power_user_winning_picks = data;
        });

        this.homesettingsService.userPlayer$.subscribe(data => {
            this.user_player = data;
        });

        this.accountService.getUsers().subscribe(data => {
            this.users = data;
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
}