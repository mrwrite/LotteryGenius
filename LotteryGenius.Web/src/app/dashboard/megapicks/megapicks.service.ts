import { Injectable, OnInit } from '@angular/core';
import { MegamillionsService } from '../../shared/megamillions.service';
import { Subject } from 'rxjs';
import { MegamillionsPick } from '../../models/megamillionpick';
import { UserPick } from '../../models/userpick';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user';

@Injectable()
export class MegapicksService {
    public user: User;
    public megamillionpicks$ = new Subject<Array<MegamillionsPick>>();
    public userpicks$ = new Subject<Array<UserPick>>();
    public userwinningpicks$ = new Subject<Array<UserPick>>();

    constructor(private megamillionService: MegamillionsService,
        private userService: UserService) {
        this.user = new User();
        this.get_megamillions_picks();

        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
        this.get_user_winning_picks();
    }

    private get_user_picks() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.megamillionService.get_user_picks(parseInt(this.user.iat)).subscribe(data => this.userpicks$.next(data));
    }

    private get_user_winning_picks() {
        this.megamillionService.get_user_winning_picks(parseInt(this.user.iat))
            .subscribe(data => this.userwinningpicks$.next(data));
    }

    private get_megamillions_picks() {
        this.megamillionService.get_all_megamillions_picks().subscribe(data => this.megamillionpicks$.next(data));
    }

    public notify_change_in_megamillion_picks() {
        this.get_megamillions_picks();
    }

    public notify_change_in_user_picks() {
        this.get_user_picks();
    }

    public notify_change_in_user_winning_picks() {
        this.get_user_winning_picks();
    }
}