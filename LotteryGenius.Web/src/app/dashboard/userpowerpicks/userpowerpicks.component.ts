import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UserpowerpicksService } from './userpowerpicks.service';
import { PowerballService } from '../../shared/powerball.service';
import { User } from "../../models/user";
import { PowerballPick } from '../../models/powerballpick';
import { UserPick } from '../../models/userpick';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
    selector: 'userpowerpicks',
    templateUrl: './userpowerpicks.component.html',
    styleUrls: ['./userpowerpicks.component.css']
})
export class UserpowerpicksComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public userPicks: Array<UserPick>;
    public selectAll: boolean = false;
    public showSendNumbers: boolean = false;

    constructor(private userpowerpicksService: UserpowerpicksService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private powerballService: PowerballService) {
        this.userPicks = new Array<UserPick>();
        this.userpowerpicksService.notify_change_in_user_picks();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.userpowerpicksService.userPicks$.subscribe(data => {
            this.userPicks = data;
        });
    }

    updateCheck() {
        if (this.selectAll === true) {
            this.userPicks.map((picks) => {
                picks.checked = true;
            });
        } else {
            this.userPicks.map((picks) => {
                picks.checked = false;
            });
        }
        this.selectCheck();
    }

    selectCheck() {
        var count = this.userPicks.filter(item => item.checked === true)
            .reduce((sum, current) => sum + 1, 0);

        if (count >= 1) {
            this.showSendNumbers = true;
        } else {
            this.showSendNumbers = false;
        }
    }
}