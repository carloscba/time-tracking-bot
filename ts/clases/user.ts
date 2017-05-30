export module User{
    export class User{
        
        private request:any;
        private platform:any;
        private access_token:string;
        
        constructor(platform, access_token) {
            this.request = require('request');
            this.platform = platform;
            this.access_token = access_token;
        }

        public get():any{

        }

        public post():any{

        }        

        public put():any{     
            
        }

        public delete():any{     
            
        }        

    }

}