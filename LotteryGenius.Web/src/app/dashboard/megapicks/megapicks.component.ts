import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { MegapicksService } from './megapicks.service';
import { MegamillionsService } from '../../shared/megamillions.service';
import { User } from "../../models/user";
import { MegamillionsPick } from '../../models/megamillionpick';
import { UserPick } from '../../models/userpick';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
    selector: 'app-megapicks',
    templateUrl: './megapicks.component.html',
    styleUrls: ['./megapicks.component.css']
})
export class MegapicksComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public megamillionPicks: Array<MegamillionsPick>;

    constructor(private megapicksService: MegapicksService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private megamillionsService: MegamillionsService) {
        this.megamillionPicks = new Array<MegamillionsPick>();
        this.megapicksService.notify_change_in_megamillion_picks();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.megapicksService.megamillionpicks$.subscribe(data => {
            this.megamillionPicks = data;
        });
    }

    public add_user_pick(pick: MegamillionsPick) {
        var user_picks = new Array<UserPick>();

        var user_pick = new UserPick;

        user_pick.user_id = parseInt(this.user.iat);
        user_pick.pick_id = pick.id;
        user_pick.game_type = 'megamillions';
        user_pick.ball1 = pick.ball1;
        user_pick.ball2 = pick.ball2;
        user_pick.ball3 = pick.ball3;
        user_pick.ball4 = pick.ball4;
        user_pick.ball5 = pick.ball5;
        user_pick.lottoball = pick.megaball;

        user_picks.push(user_pick);

        this.megamillionsService.add_user_picks(user_picks).subscribe(data => {
            this.megapicksService.notify_change_in_megamillion_picks();
        });
    }
}