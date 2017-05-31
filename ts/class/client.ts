export module Client{
    
    export class Client{
        
        private id:any;
        private firebase:any;
        
        constructor(firebase:any) {
            this.firebase = firebase;
        }
        
        /**
         * get a client by id
         * @param {Number} id 
         * @returns {Promise}
         */
        public get(id:any):any{
            console.log('--> /clients/[id]', '/clients/'+ id)
            let ref = this.firebase.database().ref('/clients/client-'+ id);   
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
        public getAll():any{
            console.log('--> /clients', '/clients')
            let ref = this.firebase.database().ref('/clients');   
            return ref.orderByChild('name');
        }        

    }

}