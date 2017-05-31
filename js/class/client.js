"use strict";
var Client;
(function (Client_1) {
    class Client {
        constructor(firebase) {
            this.firebase = firebase;
        }
        /**
         * get a client by id
         * @param {Number} id
         * @returns {Promise}
         */
        get(id) {
            console.log('--> /clients/[id]', '/clients/' + id);
            let ref = this.firebase.database().ref('/clients/client-' + id);
            return ref.once('value');
        }
        /**
         * get all clients
         * @returns {Promise}
         * @example
         * client.getAll().on("child_added", function(snapshot) {
                console.log(snapshot.val().name);
            });
         */
        getAll() {
            console.log('--> /clients', '/clients');
            let ref = this.firebase.database().ref('/clients');
            return ref.orderByChild("name");
        }
    }
    Client_1.Client = Client;
})(Client = exports.Client || (exports.Client = {}));
//# sourceMappingURL=client.js.map