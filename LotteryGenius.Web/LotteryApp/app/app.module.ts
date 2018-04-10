import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgPipesModule } from "ngx-pipes";
import { AccountService } from './shared/accountservice';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VerificationComponent } from './verification/verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "./shared/auth-guard.service";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "verification", component: VerificationComponent, canActivate: [AuthGuard] },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        VerificationComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterModule.forRoot(routes,
            {
                useHash: true,
                enableTracing: false
            })
    ],
    providers: [AccountService,
        AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }