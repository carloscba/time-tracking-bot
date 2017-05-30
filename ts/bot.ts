var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var dotenv = require('dotenv').config()

//DIALOGS
import { InputWelcome as  inputWelcome } from "./dialogs/input.welcome";
import { InputUnknown as  inputUnknown } from "./dialogs/input.unknown";
import { InputTask as  inputTask } from "./dialogs/input.task";
import { InputTaskList as  inputTaskList } from "./dialogs/input.tasklist";

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
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

bot.dialog('/', [
    (session, args) => {    

        let msg = session.message.text; //input by user
        let sessionId = session.message.address.id; //set session for user
        let isAttachment = (session.message.attachments.length > 0); //set text as input or attachment
        console.log('isAttachment', isAttachment)

        if(!isAttachment){
            session.sendTyping();
   
            var request = botai.textRequest(msg, {
                sessionId: sessionId
            });

            request.on('response', function(response) {
                try{
                    let action = response.result.action;
                    let aiResult = response.result;
                    
                    console.log('action', action);
                    console.log('score', aiResult.score);

                    session.endDialog();
                    callAction(action, aiResult, session);
                    

                }catch(e){
                    console.log('request.on response error', e)
                    session.send('Error on response');
                }
                
            });//request.on('response')
            
            request.on('error', function(error) {
                
                console.log('request.on error', error)
                session.send('Error on response');

            });//request.on('error')
            
            request.end();        

        }else{//if(!isAttachment)
            
            //if message is an Attachment

        }//if(!isAttachment)
        

    },
]);

let callAction = function(action, aiResult, session){
    
    console.log('session.message.user', session.message.user);

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