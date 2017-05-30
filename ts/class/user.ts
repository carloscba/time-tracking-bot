export module User{
    
    export class User{
        
        private id:any;
        private axios:any;

        private basePath:string = 'https://jsonplaceholder.typicode.com';
        
        constructor(id) {
            this.axios = require('axios');
            this.id = id;
        }

        public get():any{
            return this.axios.get( this.basePath +'/users/'+ this.id);
        }

        public post():any{

        }        

        public put():any{     
            
        }

        public delete():any{     
            
        }        

    }

}