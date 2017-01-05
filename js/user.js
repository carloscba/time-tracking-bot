"use strict";
var User;
(function (User_1) {
    //import {Request} from "request";
    class User {
        constructor(platform, access_token) {
            this.baseUrl = " http://wepa.m8loves.me";
            this.endpointGetUser = "/api/leads";
            this.request = require('request');
            this.platform = platform;
            this.access_token = access_token;
        }
        getUser(user) {
            console.log(user);
            var _this = this;
            var options = {
                "auth": {
                    "bearer": this.access_token,
                },
                "X-Requested-With": "XMLHttpRequest"
            };
            console.log(_this.baseUrl + this.endpointGetUser);
            var userPromise = new Promise(function (resolve, reject) {
                _this.request(_this.baseUrl + _this.endpointGetUser, options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        var data = JSON.parse(body);
                        resolve(data);
                    }
                });
                resolve(user);
            });
            return userPromise;
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map