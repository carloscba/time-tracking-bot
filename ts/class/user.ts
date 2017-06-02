export module User{
    
    export class User{
        
        private id:any;
        private endPoint:string = 'http://localhost:8000/usersbot';
        private axios:any;

        constructor(token) {
            this.axios = require('axios');
            this.axios.defaults.headers.common['Authorization'] = 'JWT '+ token;
        }
        
        /**
         * get a user by id
         * @param {Number} id 
         * @returns {Promise}
         */
        public get(id:any):any{
            let url:string;
            if(id){
                url = `${this.endPoint}/${id}/`;
            }else{
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
        public post(data:any):any{
            let url = `${this.endPoint}/`;
            console.log('----> endPoint user class', url);
            return this.axios.post(url, {
                name : data.name,
                platform_id : data.id
            })
        }        

        /**
         * Update a user
         * @param {Number} id
         * @param {Array} data
         * @example
         * user.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){}); 
         * @returns {Promise}
         */         
        public put(id:any, data:any):any{     
            if(typeof(data) === 'object'){
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
        public delete(id:any):any{     
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }        

    }

}