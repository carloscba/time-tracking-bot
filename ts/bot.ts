var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var dotenv = require('dotenv').config()
//Users
import {User as userObj} from "./class/user";
//DIALOGS
import { InputWelcome as  inputWelcome } from "./dialogs/input.welcome";
import { InputUnknown as  inputUnknown } from "./dialogs/input.unknown";
import { InputTask as  inputTask } from "./dialogs/input.task";
import { InputTaskList as  inputTaskList } from "./dialogs/input.tasklist";

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('--> %s listening to %s', server.name, server.url); 
});
  
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

bot.set('localizerSettings', {
    defaultLocale: "es" 
});

server.post('/api/messages', connector.listen());

var botai = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN);



var user = new userObj.User();


bot.use({
    botbuilder: function (session, next) {
        console.log('--> session.userData.profile', session.userData.profile);
        if(session.userData.profile === undefined){
            
            user.get(3).then(function (response) {
                
                console.log('--> SUCCESS user get: ', response.data);
                session.userData.profile = response.data;
                next();

            }).catch(function (error) {
                console.log('--> ERROR user get: ', error);
                user.post({
                    id : session.message.user.id,
                    name : session.message.user.name
                }).then(function(response){
                    console.log('--> SUCCESS user add:', response);
                    session.userData.profile = response.data;
                    next();
                }).catch(function (error) {
                    console.log('--> ERROR user add', error);        
                });                
            });        
        
        }else{
            console.log('--> User exist: ', session.userData);
            next();
        }//if(session.userData.id === null){
        
        
    }
});

bot.dialog('/', [
    (session, args) => {    
        
        console.log('--> session.userData', session.userData);

        let msg = session.message.text; //input by user
        let sessionId = session.message.address.id; //set session for user
        let isAttachment = (session.message.attachments.length > 0); //set text as input or attachment
        console.log('--> isAttachment', isAttachment)

        if(!isAttachment){
            session.sendTyping();
   
            var request = botai.textRequest(msg, {
                sessionId: sessionId
            });

            request.on('response', function(response) {
                try{
                    let action = response.result.action;
                    let aiResult = response.result;
                    
                    console.log('--> action', action);
                    console.log('--> score', aiResult.score);

                    session.endDialog();
                    callAction(action, aiResult, session);
                    

                }catch(e){
                    console.log('--> request.on response error', e)
                    session.send('Error on response');
                }
                
            });//request.on('response')
            
            request.on('error', function(error) {
                
                console.log('--> request.on error', error)
                session.send('Error on response');

            });//request.on('error')
            
            request.end();        

        }else{//if(!isAttachment)
            
            //if message is an Attachment

        }//if(!isAttachment)
        

    },
]);

let callAction = function(action, aiResult, session){
    //save unknown query
    if(action === 'input.unknown'){
        session.userData.unknownQuery = {
            'resolvedQuery' : aiResult.resolvedQuery
        }   
    }
    session.beginDialog(action, aiResult);
}

bot.dialog('input.unknown', inputUnknown.dialog());
bot.dialog('input.welcome', inputWelcome.dialog());
bot.dialog('input.task', inputTask.dialog());
bot.dialog('input.tasklist', inputTaskList.dialog());