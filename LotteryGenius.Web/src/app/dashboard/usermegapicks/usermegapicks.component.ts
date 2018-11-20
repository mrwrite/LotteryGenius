import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UsermegapicksService } from './usermegapicks.service';
import { MegamillionsService } from '../../shared/megamillions.service';
import { User } from "../../models/user";
import { MegamillionsPick } from '../../models/megamillionpick';
import { UserPick } from '../../models/userpick';
import { Subscription } from 'rxjs';

@Component({
    selector: 'usermegapicks',
    templateUrl: './usermegapicks.component.html',
    styleUrls: ['./usermegapicks.component.css']
})
export class UsermegapicksComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public userPicks: Array<UserPick>;
    public selectAll: boolean = false;
    public showSendNumbers: boolean = false;

    constructor(private usermegapicksService: UsermegapicksService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private megamillionService: MegamillionsService) {
        this.userPicks = new Array<UserPick>();
        this.usermegapicksService.notify_change_in_user_picks();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.usermegapicksService.userPicks$.subscribe(data => {
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