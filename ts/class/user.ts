export module User{
    
    export class User{
        
        private id:any;
        private firebase:any;
        
        constructor(firebase:any) {
            this.firebase = firebase;
        }
        
        /**
         * get a user by id
         * @param {Number} id 
         * @returns {Promise}
         */
        public get(id:any):any{
            console.log('--> /users/[id]', '/users/'+ id)
            let userRef = this.firebase.database().ref('/users/user-'+ id);   
            return userRef.once('value');
        }

        /**
         * Insert new user
         * @param {Array} data
         * @example
         * user.push({'id': 42,'name': 'Name'})
         * @returns {Promise}
         */        
        public push(data:any):any{
            if(typeof(data) === 'object' && data.id && data.name){
                let ref = this.firebase.database().ref('users');

                return ref.child('user-'+ data.id).set({                    
                    id: data.id,
                    name: data.name
                });
            }else{
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
        public update(id:any, data:any):any{     
            if(typeof(data) === 'object'){
                let ref = this.firebase.database().ref('users');
                let updateRef = ref.child('user-'+id);
                
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
        public remove(id:any):any{     
            let ref = this.firebase.database().ref('users');
            return ref.child('user-'+id).remove();
        }        

    }

}