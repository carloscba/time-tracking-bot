"use strict";
var Task;
(function (Task_1) {
    class Task {
        constructor() {
            this.endPoint = 'http://localhost:8000/tasks';
            this.axios = require('axios');
        }
        /**
         * get a task by id
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
            console.log('----> endPoint task class', url);
            return this.axios.get(url);
        }
        /**
         * Insert new task
         * @param {Array} data
         * @example
         * task.post({'id': 42,'name': 'Name'})
         * @returns {Promise}
         */
        post(data) {
            let url = `${this.endPoint}/`;
            console.log('----> endPoint task class', url);
            return this.axios.post(url, {
                description: data.description,
                client_name: data.client_name
            });
        }
        /**
         * Update a task
         * @param {Number} id
         * @param {Array} data
         * @example
         * task.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){});
         * @returns {Promise}
         */
        put(id, data) {
            if (typeof (data) === 'object') {
                let url = `${this.endPoint}/${id}/`;
                console.log('----> endPoint task class', url);
                return this.axios.put(url, data);
            }
        }
        /**
         * Delete a task
         * @param {Number} id
         * @example
         * task.remove(session.userData.profile.id).then(function(){});
         * @returns {Promise}
         */
        delete(id) {
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }
    }
    Task_1.Task = Task;
})(Task = exports.Task || (exports.Task = {}));
//# sourceMappingURL=task.js.map