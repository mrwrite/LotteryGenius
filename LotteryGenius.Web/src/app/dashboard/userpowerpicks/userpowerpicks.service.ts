import { Injectable } from '@angular/core';
import { PowerballService } from '../../shared/powerball.service';
import { Subject } from 'rxjs';
import { PowerballPick } from '../../models/powerballpick';
import { UserPick } from '../../models/userpick';
import { UserService } from "../../shared/user.service";
import { User } from "../../models/user";

@Injectable()
export class UserpowerpicksService {
    public user: User;
    public userPicks$ = new Subject<Array<UserPick>>();

    constructor(private powerballService: PowerballService, private userService: UserService) {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_picks();
    }

    private get_user_picks() {
        this.powerballService.get_user_picks(parseInt(this.user.iat)).subscribe(data => this.userPicks$.next(data));
    }

    public notify_change_in_user_picks() {
        this.get_user_picks();
    }
}