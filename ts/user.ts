export module User{
    
    //import {Request} from "request";

    export class User{
        
        
        private access_token:string = "EAAKklVod9dcBAPTWkd5FzwpQDsfUrlbpV351Emv35KObsZBjZCAHRhjfSUe8ZBaxKFnMchOpIbUo9F9AmJnuXAgKhW3bdsTiyrZBUafb8PdnD8RtDlncwfVn50wJviOjpBgV1PeDJNjU9JVed8FnHJJQtH4kIN17iRGGirFZCugZDZD"
        private baseUrl:String      = "https://graph.facebook.com/v2.8/"
        private request;
        //714243435;
        

        constructor() {
            this.request    = require('request');
        }

        public getUser(id:string):any{
            
            var _this = this;
            var userPromise = new Promise(function(resolve, reject){
                
                _this.request(_this.baseUrl+id+"?access_token="+_this.access_token, function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        var data = JSON.parse(body);
                        resolve(data);    
                    }

                })

            });

            return userPromise;

        }

    }

}