"use strict";
var User;
(function (User_1) {
    class User {
        constructor() {
            this.endPoint = 'http://localhost:8000/usersbot';
            this.axios = require('axios');
            /*
            this.axios.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                return Promise.reject(error);
            });
            */
        }
        /**
         * get a user by id
         * @param {Number} id
         * @returns {Promise}
         */
        get(id) {
            let url;
            if (id) {
                url = `${this.endPoint}/${id}/`;
            }
            else {
                url = `${this.endPoint}/`;
            }
            console.log('----> endPoint user class', url);
            return this.axios.get(url);
        }
        /**
         * Insert new user
         * @param {Array} data
         * @example
         * user.post({'id': 42,'name': 'Name'})
         * @returns {Promise}
         */
        post(data) {
            let url = `${this.endPoint}/`;
            console.log('----> endPoint user class', url);
            return this.axios.post(url, {
                name: data.name,
                platform_id: data.id
            });
        }
        /**
         * Update a user
         * @param {Number} id
         * @param {Array} data
         * @example
         * user.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){});
         * @returns {Promise}
         */
        put(id, data) {
            if (typeof (data) === 'object') {
                let url = `${this.endPoint}/${id}/`;
                console.log('----> endPoint user class', url);
                return this.axios.put(url, data);
            }
        }
        /**
         * Delete a user
         * @param {Number} id
         * @example
         * user.remove(session.userData.profile.id).then(function(){});
         * @returns {Promise}
         */
        delete(id) {
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map