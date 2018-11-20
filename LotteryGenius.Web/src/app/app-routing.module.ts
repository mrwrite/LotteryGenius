import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './shared/auth-guard.service';
import { PowerpicksComponent } from './dashboard/powerpicks/powerpicks.component';
import { MegapicksComponent } from './dashboard/megapicks/megapicks.component';
import { UserpowerpicksComponent } from './dashboard/userpowerpicks/userpowerpicks.component';
import { UsermegapicksComponent } from './dashboard/usermegapicks/usermegapicks.component';

const routes: Routes = [
    { path: "", component: LoginComponent },
    {
        path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: HomeComponent, canActivate: [AuthGuard] },
            { path: "powerpicks", component: PowerpicksComponent, canActivate: [AuthGuard] },
            { path: "megapicks", component: MegapicksComponent, canActivate: [AuthGuard] },
            { path: "userpowerpicks", component: UserpowerpicksComponent, canActivate: [AuthGuard] },
            { path: "usermegapicks", component: UsermegapicksComponent, canActivate: [AuthGuard] }
        ]
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }