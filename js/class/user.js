"use strict";
var User;
(function (User_1) {
    class User {
        constructor(id) {
            this.basePath = 'https://jsonplaceholder.typicode.com';
            this.axios = require('axios');
            this.id = id;
        }
        get() {
            return this.axios.get(this.basePath + '/users/' + this.id);
        }
        post() {
        }
        put() {
        }
        delete() {
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map