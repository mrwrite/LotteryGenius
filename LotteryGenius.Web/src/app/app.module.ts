import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, TemplateRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatToolbarModule, MatGridListModule,
    MatListModule,
    MatExpansionModule
} from '@angular/material';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PowerballService } from './shared/powerball.service';
import { PowerpicksService } from './dashboard/powerpicks/powerpicks.service';
import { MegamillionsService } from './shared/megamillions.service';
import { MegapicksService } from './dashboard/megapicks/megapicks.service';

import { AuthGuard } from './shared/auth-guard.service';
import { HomeComponent } from './dashboard/home/home.component';
import { PowerpicksComponent } from './dashboard/powerpicks/powerpicks.component';
import { MegapicksComponent } from './dashboard/megapicks/megapicks.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        PowerpicksComponent,
        MegapicksComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatExpansionModule,
        ScrollingModule
    ],
    providers: [AuthGuard,
        PowerballService,
        MegamillionsService,
        PowerpicksService,
        MegapicksService],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);