export module User{
    
    //import {Request} from "request";

    export class User{
        
        //

        private access_token:string
        private baseUrl:String = " http://wepa.m8loves.me"
        private request;
        private platform;

        private endpointGetUser:string    = "/api";
        private endpointCreateUser:string = "/api";
        
        public debug:Boolean = false;        

        constructor(platform, access_token) {
            this.request = require('request');
            this.platform = platform;
            this.access_token = access_token;
        }

        public getUser(user:any):any{

            //Eliminar cuando tenga el campo alfanumerico
            user.id = 123456789;
            
            var _this = this;
            var options = {
                "auth": {
                    "bearer": this.access_token,
                },
                "X-Requested-With" : "XMLHttpRequest" 
            }

            var userPromise = new Promise(function(resolve, reject){

                _this.request(_this.baseUrl+_this.endpointGetUser+"/"+user.id, options, function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        var savedData = JSON.parse(body);
                        
                        if(savedData.count > 0){
                            resolve(savedData.lead[0]);

                            _this.log("Found User");
                            _this.log(savedData.lead[0]);                            
                        }else{
                            let url = _this.baseUrl+_this.endpointCreateUser+"?name="+user.name+"&scoped_fbid="+user.id
                            _this.request(url , options, function (error, response, body) {
                                let savedData = JSON.parse(body);
                                resolve(savedData.lead);

                                _this.log("Saved User");                                
                                _this.log(savedData.lead);                                                              
                            })
                        }
                        
                    }
                })
                
                resolve(user);

            });

            return userPromise;
        }

        private log(msg):void{
            if(this.debug){
                console.log(msg);
            }
            
        }        

    }

}