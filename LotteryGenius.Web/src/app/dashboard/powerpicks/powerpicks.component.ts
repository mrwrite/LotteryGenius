import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { PowerpicksService } from './powerpicks.service';
import { PowerballService } from '../../shared/powerball.service';
import { User } from "../../models/user";
import { PowerballPick } from '../../models/powerballpick';
import { UserPick } from '../../models/userpick';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
    selector: 'powerpicks',
    templateUrl: './powerpicks.component.html',
    styleUrls: ['./powerpicks.component.css']
})
export class PowerpicksComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public powerballPicks: Array<PowerballPick>;

    constructor(private powerpicksService: PowerpicksService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private powerballService: PowerballService) {
        this.powerballPicks = new Array<PowerballPick>();
        this.powerpicksService.notify_change_in_powerball_picks();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.powerpicksService.powerballpicks$.subscribe(data => {
            this.powerballPicks = data;
        });
    }

    public add_user_pick(pick: PowerballPick) {
        var user_picks = new Array<UserPick>();

        var user_pick = new UserPick;

        user_pick.user_id = parseInt(this.user.iat);
        user_pick.pick_id = pick.id;
        user_pick.game_type = 'powerball';
        user_pick.ball1 = pick.ball1;
        user_pick.ball2 = pick.ball2;
        user_pick.ball3 = pick.ball3;
        user_pick.ball4 = pick.ball4;
        user_pick.ball5 = pick.ball5;
        user_pick.lottoball = pick.powerball;

        user_picks.push(user_pick);

        this.powerballService.add_user_picks(user_picks).subscribe(data => {
            this.powerpicksService.notify_change_in_powerball_picks();
        });
    }
}