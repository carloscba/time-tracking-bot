"use strict";
var Client;
(function (Client_1) {
    class Client {
        constructor(token) {
            this.endPoint = 'http://localhost:8000/clients';
            this.axios = require('axios');
            this.axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
        }
        /**
         * get a client by id
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
            console.log('----> endPoint client class', url);
            return this.axios.get(url);
        }
        /**
         * Insert new client
         * @param {Array} data
         * @example
         * client.post({'id': 42,'name': 'Name'})
         * @returns {Promise}
         */
        post(data) {
            let url = `${this.endPoint}/`;
            console.log('----> endPoint client class', url);
            return this.axios.post(url, {
                name: data.name,
                platform_id: data.id
            });
        }
        /**
         * Update a client
         * @param {Number} id
         * @param {Array} data
         * @example
         * client.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){});
         * @returns {Promise}
         */
        put(id, data) {
            if (typeof (data) === 'object') {
                let url = `${this.endPoint}/${id}/`;
                console.log('----> endPoint client class', url);
                return this.axios.put(url, data);
            }
        }
        /**
         * Delete a client
         * @param {Number} id
         * @example
         * client.remove(session.userData.profile.id).then(function(){});
         * @returns {Promise}
         */
        delete(id) {
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }
    }
    Client_1.Client = Client;
})(Client = exports.Client || (exports.Client = {}));
//# sourceMappingURL=client.js.map