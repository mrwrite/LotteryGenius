var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatGridListModule, MatListModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PowerballService } from './shared/powerball.service';
import { PowerpicksService } from './dashboard/powerpicks/powerpicks.service';
import { MegamillionsService } from './shared/megamillions.service';
import { SettingsService } from './shared/settings.service';
import { MegapicksService } from './dashboard/megapicks/megapicks.service';
import { UserpowerpicksService } from './dashboard/userpowerpicks/userpowerpicks.service';
import { UsermegapicksService } from './dashboard/usermegapicks/usermegapicks.service';
import { UserpowerwinnersService } from './dashboard/userpowerwinners/userpowerwinners.service';
import { UsermegawinnersService } from './dashboard/usermegawinners/usermegawinners.service';
import { HomesettingsService } from './dashboard/home/homesettings.service';
import { AuthGuard } from './shared/auth-guard.service';
import { HomeComponent } from './dashboard/home/home.component';
import { PowerpicksComponent } from './dashboard/powerpicks/powerpicks.component';
import { MegapicksComponent } from './dashboard/megapicks/megapicks.component';
import { UserpowerpicksComponent } from './dashboard/userpowerpicks/userpowerpicks.component';
import { UsermegapicksComponent } from './dashboard/usermegapicks/usermegapicks.component';
import { UserpickentryComponent } from './dashboard/home/userpickentry/userpickentry.component';
import { UserpowerwinnersComponent } from './dashboard/userpowerwinners/userpowerwinners.component';
import { UsermegawinnersComponent } from './dashboard/usermegawinners/usermegawinners.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                LoginComponent,
                DashboardComponent,
                HomeComponent,
                PowerpicksComponent,
                MegapicksComponent,
                UserpowerpicksComponent,
                UsermegapicksComponent,
                UserpickentryComponent,
                UserpowerwinnersComponent,
                UsermegawinnersComponent
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
                ScrollingModule,
                MatCheckboxModule,
                MatButtonModule,
                MatSnackBarModule,
                ModalModule.forRoot()
            ],
            entryComponents: [
                UserpickentryComponent
            ],
            providers: [AuthGuard,
                PowerballService,
                MegamillionsService,
                PowerpicksService,
                MegapicksService,
                UserpowerpicksService,
                UsermegapicksService,
                UserpowerwinnersService,
                UsermegawinnersService,
                SettingsService,
                HomesettingsService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map