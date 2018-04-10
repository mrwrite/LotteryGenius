"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var accountservice_1 = require("./shared/accountservice");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var verification_component_1 = require("./verification/verification.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var auth_guard_service_1 = require("./shared/auth-guard.service");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "verification", component: verification_component_1.VerificationComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: "dashboard", component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuard] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                verification_component_1.VerificationComponent,
                dashboard_component_1.DashboardComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(exports.routes, {
                    useHash: true,
                    enableTracing: false
                })
            ],
            providers: [accountservice_1.AccountService,
                auth_guard_service_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map