var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AuthGuard } from './shared/auth-guard.service';
import { PowerpicksComponent } from './dashboard/powerpicks/powerpicks.component';
import { MegapicksComponent } from './dashboard/megapicks/megapicks.component';
import { UserpowerpicksComponent } from './dashboard/userpowerpicks/userpowerpicks.component';
import { UsermegapicksComponent } from './dashboard/usermegapicks/usermegapicks.component';
import { UserpowerwinnersComponent } from './dashboard/userpowerwinners/userpowerwinners.component';
import { UsermegawinnersComponent } from './dashboard/usermegawinners/usermegawinners.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
var routes = [
    { path: "", component: LoginComponent },
    {
        path: "admin", component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: AdminhomeComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: HomeComponent, canActivate: [AuthGuard] },
            { path: "powerpicks", component: PowerpicksComponent, canActivate: [AuthGuard] },
            { path: "megapicks", component: MegapicksComponent, canActivate: [AuthGuard] },
            { path: "userpowerpicks", component: UserpowerpicksComponent, canActivate: [AuthGuard] },
            { path: "usermegapicks", component: UsermegapicksComponent, canActivate: [AuthGuard] },
            { path: "userpowerwinners", component: UserpowerwinnersComponent, canActivate: [AuthGuard] },
            { path: "usermegawinners", component: UsermegawinnersComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: "password-change", component: PasswordChangeComponent, canActivate: [AuthGuard] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map