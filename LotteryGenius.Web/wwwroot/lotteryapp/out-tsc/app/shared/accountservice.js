"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
core_1.Injectable();
var AccountService = /** @class */ (function () {
    function AccountService(http) {
        this.http = http;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.baseUrl = "http://localhost:6000/";
    }
    Object.defineProperty(AccountService.prototype, "loginRequired", {
        get: function () {
            return this.token.length === 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AccountService.prototype.login = function (creds) {
        return this.http.post(this.baseUrl + "api/account/createtoken", creds)
            .map(function (res) { return res.json(); });
    };
    AccountService.prototype.logout = function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    AccountService.prototype.get_users = function () {
    };
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=accountservice.js.map