"use strict";
var User;
(function (User_1) {
    class User {
        constructor() {
            const serviceAccount = require("../../time-tracking-bot-firebase-adminsdk-wrl4r-3023809fe3.json");
            this.firebase = require("firebase-admin");
            this.firebase.initializeApp({
                credential: this.firebase.credential.cert(serviceAccount),
                databaseURL: "https://time-tracking-bot.firebaseio.com"
            });
        }
        get(id) {
            console.log('--> /users/[id]', '/users/' + id);
            let userRef = this.firebase.database().ref('/users/user-' + id);
            return userRef.once('value');
        }
        /*
        {
            'id': randomNumber,
            'name': 'Name'+randomNumber
        }
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
        /*
        user.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){
            console.log('----> Update', data);
        });
        */
        update(id, data) {
            if (typeof (data) === 'object') {
                let ref = this.firebase.database().ref('users');
                let updateRef = ref.child('user-' + id);
                return updateRef.update(data);
            }
        }
        remove(id) {
            let ref = this.firebase.database().ref('users');
            return ref.child('user-' + id).remove();
        }
    }
    User_1.User = User;
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map