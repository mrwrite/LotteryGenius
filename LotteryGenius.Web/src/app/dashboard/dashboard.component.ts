import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { PowerballService } from "../shared/powerball.service";
import { MegamillionsService } from "../shared/megamillions.service";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserView } from "../models/user.view";
import { PowerballPick } from "../models/powerballpick";
import { MegamillionsPick } from "../models/megamillionpick";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public user: User;
    public users: UserView[];
    public role: string;
    public today: number = Date.now();
    public all_powerball_picks: Array<PowerballPick>;
    public all_megamillions_picks: Array<MegamillionsPick>;

    isExpanded = false;

    constructor(private userService: UserService,
        private accountService: AccountService,
        private router: Router,
        private powerballService: PowerballService,
        private megamillionsService: MegamillionsService) {
        this.all_powerball_picks = new Array<PowerballPick>();
        this.all_megamillions_picks = new Array<MegamillionsPick>();
    }

    ngOnInit(): void {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.accountService.getUsers().subscribe(data => this.users = data);

        if (!this.user) {
            this.router.navigate([""]);
        } else {
            if (this.user.initialLogin === 'True') {
                this.router.navigate(["change-password"]);
            } else {
                this.role = this.user.role;
            }
        }

        this.powerballService.get_all_powerball_picks().subscribe(data => {
            this.all_powerball_picks = data;
        });

        this.megamillionsService.get_all_megamillions_picks().subscribe(data => {
            this.all_megamillions_picks = data;
        });
    }

    public logout() {
        this.accountService.logout();
        this.router.navigate([""]);
    }
}