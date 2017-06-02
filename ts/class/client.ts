export module Client{
    
    export class Client{
        
        private id:any;
        private endPoint:string = 'http://localhost:8000/clients';
        private axios:any;

        constructor() {
            this.axios = require('axios');
        }
        
        /**
         * get a client by id
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
        public post(data:any):any{
            let url = `${this.endPoint}/`;
            console.log('----> endPoint client class', url);
            return this.axios.post(url, {
                name : data.name,
                platform_id : data.id
            })
        }        

        /**
         * Update a client
         * @param {Number} id
         * @param {Array} data
         * @example
         * client.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){}); 
         * @returns {Promise}
         */         
        public put(id:any, data:any):any{     
            if(typeof(data) === 'object'){
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
        public delete(id:any):any{     
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }        

    }

}