"use strict";
var User;
(function (User_1) {
    //import {Request} from "request";
    class User {
        //714243435;
        constructor() {
            this.access_token = "EAAKklVod9dcBAPTWkd5FzwpQDsfUrlbpV351Emv35KObsZBjZCAHRhjfSUe8ZBaxKFnMchOpIbUo9F9AmJnuXAgKhW3bdsTiyrZBUafb8PdnD8RtDlncwfVn50wJviOjpBgV1PeDJNjU9JVed8FnHJJQtH4kIN17iRGGirFZCugZDZD";
            this.baseUrl = "https://graph.facebook.com/v2.8/";
            this.request = require('request');
        }
        getUser(id) {
            var _this = this;
            var userPromise = new Promise(function (resolve, reject) {
                _this.request(_this.baseUrl + id + "?access_token=" + _this.access_token, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var data = JSON.parse(body);
                        resolve(data);
                    }
                });
            });
            return userPromise;
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map