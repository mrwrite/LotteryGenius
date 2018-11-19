import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
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
import { PowerpicksService } from '../powerpicks/powerpicks.service';
import { MegapicksService } from '../megapicks/megapicks.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public user: User;
    public all_powerball_picks: Array<PowerballPick>;
    public all_megamillions_picks: Array<MegamillionsPick>;
    public user_picks: Array<UserPick>;
    public mega_user_picks: Array<UserPick>;
    public mega_user_winning_picks: Array<UserPick>;
    public power_user_winning_picks: Array<UserPick>;

    constructor(private userService: UserService,
        private powerballService: PowerballService,
        private megamillionsService: MegamillionsService,
        private powerpicksService: PowerpicksService,
        private megapicksService: MegapicksService) {
        this.all_powerball_picks = new Array<PowerballPick>();
        this.all_megamillions_picks = new Array<MegamillionsPick>();
        this.user_picks = new Array<UserPick>();
        this.mega_user_picks = new Array<UserPick>();
        this.mega_user_winning_picks = new Array<UserPick>();
        this.power_user_winning_picks = new Array<UserPick>();
        this.powerpicksService.notify_change_in_user_picks();
        this.megapicksService.notify_change_in_user_picks();
        this.megapicksService.notify_change_in_user_winning_picks();
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
    }
}