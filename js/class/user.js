"use strict";
var User;
(function (User_1) {
    class User {
        constructor(firebase) {
            this.firebase = firebase;
        }
        /**
         * get a user by id
         * @param {Number} id
         * @returns {Promise}
         */
        get(id) {
            console.log('--> /users/[id]', '/users/' + id);
            let userRef = this.firebase.database().ref('/users/user-' + id);
            return userRef.once('value');
        }
        /**
         * Insert new user
         * @param {Array} data
         * @example
         * user.push({'id': 42,'name': 'Name'})
         * @returns {Promise}
         */
        push(data) {
            if (typeof (data) === 'object' && data.id && data.name) {
                let ref = this.firebase.database().ref('users');
                return ref.child('user-' + data.id).set({
                    id: data.id,
                    name: data.name
                });
            }
            else {
                console.log('-->ERROR typeof(data) in user.push()');
            }
        }
        /**
         * Update a user
         * @param {Number} id
         * @param {Array} data
         * @example
         * user.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){});
         * @returns {Promise}
         */
        update(id, data) {
            if (typeof (data) === 'object') {
                let ref = this.firebase.database().ref('users');
                let updateRef = ref.child('user-' + id);
                return updateRef.update(data);
            }
        }
        /**
         * Delete a user
         * @param {Number} id
         * @example
         * user.remove(session.userData.profile.id).then(function(){});
         * @returns {Promise}
         */
        remove(id) {
            let ref = this.firebase.database().ref('users');
            return ref.child('user-' + id).remove();
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map