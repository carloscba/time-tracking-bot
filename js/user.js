"use strict";
var User;
(function (User_1) {
    //import {Request} from "request";
    class User {
        constructor(platform, access_token) {
            this.baseUrl = "";
            this.endpointGetUser = "";
            this.endpointCreateUser = "";
            this.endpointUpdateUser = "";
            this.debug = false;
            this.request = require('request');
            this.platform = platform;
            this.access_token = access_token;
            this.optionsRequest = {
                "auth": {
                    "bearer": this.access_token,
                },
                "X-Requested-With": "XMLHttpRequest"
            };
        }
        getUser(user) {
            //Eliminar cuando tenga el campo alfanumerico
            user.id = 123456789;
            var _this = this;
            var options = {
                "auth": {
                    "bearer": this.access_token,
                },
                "X-Requested-With": "XMLHttpRequest"
            };
            var userPromise = new Promise(function (resolve, reject) {
                _this.request(_this.baseUrl + _this.endpointGetUser + "/" + user.id, options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var savedData = JSON.parse(body);
                        if (savedData.count > 0) {
                            resolve(savedData.lead[0]);
                            _this.log("Found User");
                            _this.log(savedData.lead[0]);
                        }
                        else {
                            let url = _this.baseUrl + _this.endpointCreateUser + "?name=" + user.name + "&scoped_fbid=" + user.id;
                            _this.request(url, options, function (error, response, body) {
                                let savedData = JSON.parse(body);
                                resolve(savedData.lead);
                                _this.log("Saved User");
                                _this.log(savedData.lead);
                            });
                        }
                    }
                });
                resolve(user);
            });
            return userPromise;
        }
        updateUser(user) {
            var _this = this;
            var updatePromise = new Promise(function (resolve, reject) {
                console.log(_this.baseUrl + _this.endpointUpdateUser + "/" + user.id);
                _this.request.put(_this.baseUrl + _this.endpointUpdateUser + "/" + user.id, _this.optionsRequest, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var savedData = JSON.parse(body);
                        //resolve(savedData.lead[0]);
                        _this.log("Update User");
                        _this.log(savedData);
                    }
                }).form(user);
            });
            return updatePromise;
        }
        log(msg) {
            if (this.debug) {
                console.log(msg);
            }
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map