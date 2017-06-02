export module Task{
    
    export class Task{
        
        private id:any;
        private endPoint:string = 'http://localhost:8000/tasks';
        private axios:any;

        constructor() {
            this.axios = require('axios');
        }
        
        /**
         * get a task by id
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
        public post(data:any):any{
            let url = `${this.endPoint}/`;
            console.log('----> endPoint task class', url);
            return this.axios.post(url, {
                name : data.name,
                platform_id : data.id
            })
        }        

        /**
         * Update a task
         * @param {Number} id
         * @param {Array} data
         * @example
         * task.update(session.userData.profile.id, {name : 'new name',admin:1}).then(function(data){}); 
         * @returns {Promise}
         */         
        public put(id:any, data:any):any{     
            if(typeof(data) === 'object'){
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
        public delete(id:any):any{     
            let url = `${this.endPoint}/${id}/`;
            return this.axios.delete(url);
        }        

    }

}