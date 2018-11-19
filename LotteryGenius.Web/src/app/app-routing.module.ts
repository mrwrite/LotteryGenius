import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './shared/auth-guard.service';
import { PowerpicksComponent } from './dashboard/powerpicks/powerpicks.component';

const routes: Routes = [
    { path: "", component: LoginComponent },
    {
        path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: HomeComponent, canActivate: [AuthGuard] },
            { path: "powerpicks", component: PowerpicksComponent, canActivate: [AuthGuard] }
        ]
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }