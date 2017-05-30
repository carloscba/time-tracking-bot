export module User{
    
    //import {Request} from "request";

    export class User{
        
        //

        private access_token:string
        private baseUrl:String = ""
        private request;
        private platform;

        private endpointGetUser:string    = "";
        private endpointCreateUser:string = "";
        private endpointUpdateUser:string = "";
        
        private optionsRequest:any;

        public debug:Boolean = false;  

        constructor(platform, access_token) {
            this.request = require('request');
            this.platform = platform;
            this.access_token = access_token;
            
            this.optionsRequest = {
                "auth": {
                    "bearer": this.access_token,
                },
                "X-Requested-With" : "XMLHttpRequest" 
            };            
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

        public updateUser(user:any):any{     
            var _this = this;

            var updatePromise = new Promise(function(resolve, reject){
                console.log(_this.baseUrl+_this.endpointUpdateUser+"/"+user.id);
                _this.request.put(_this.baseUrl+_this.endpointUpdateUser+"/"+user.id, _this.optionsRequest, function (error, response, body) {

                    if (!error && response.statusCode == 200) {   
                            var savedData = JSON.parse(body);  
                            //resolve(savedData.lead[0]);

                            _this.log("Update User");
                            _this.log(savedData);                                            
                    }
                
                }).form(user);
            });
            return updatePromise;
        }

        private log(msg):void{
            if(this.debug){
                console.log(msg);
            }
            
        }       

    }

}