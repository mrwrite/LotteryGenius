import { Injectable, OnInit } from '@angular/core';
import { PowerballService } from '../../shared/powerball.service';
import { Subject } from 'rxjs';
import { PowerballPick } from '../../models/powerballpick';
import { UserPick } from '../../models/userpick';
import { UserService } from "../../shared/user.service";
import { User } from "../../models/user";

@Injectable()
export class PowerpicksService implements OnInit {
    public user: User;
    public powerballpicks$ = new Subject<Array<PowerballPick>>();
    public userpicks$ = new Subject<Array<UserPick>>();

    constructor(private powerballService: PowerballService, private userService: UserService) {
        this.get_powerball_picks();

        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
    }

    ngOnInit(): void {
    }

    private get_user_picks() {
        this.powerballService.get_user_picks(parseInt(this.user.iat)).subscribe(data => this.userpicks$.next(data));
    }

    private get_powerball_picks() {
        this.powerballService.get_all_powerball_picks().subscribe(data => this.powerballpicks$.next(data));
    }

    public notify_change_in_powerball_picks() {
        this.get_powerball_picks();
    }

    public notify_change_in_user_picks() {
        this.get_user_picks();
    }
}