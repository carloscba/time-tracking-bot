var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

import {User as userBot} from "./user";

require('dotenv').config()

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var model = process.env.MODEL;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

dialog.matches('greeting', [
    (session, args) => {
       
        console.log(session.message.address.user);

        var platform = session.message.source
        var user = new userBot.User(platform);
        var userData = user.getUser(process.env.FBID);
        
        userData.then(function(data){
            //Informacion del usuario
            session.userData = data;

            session.send("Hola " + session.userData.name)
            session.beginDialog('/initOptions');
        });
        
    },
]);

dialog.matches('None', [
    (session) => {
        session.send("No se ha reconocido el texto ingresado");
    }
]);

dialog.matches('getSavedData', [
    (session) => {
        session.send("Sus datos: "+ JSON.stringify(session.userData));
    }
]);


bot.dialog('/initOptions', [
    
    (session) => {
        builder.Prompts.choice(session, "¿Que deseas hacer?", ["Cambiar mi nombre", "Subir una imagen"]);
    },
    (session, results) => {

        switch(results.response.entity){
            case "Cambiar mi nombre":
                session.beginDialog('/saveName');
            break;
            case "Subir una imagen":
                session.beginDialog('/uploadImage');
            break;            
            default:
                session.endDialog();
            break;
        }
        
    }, 
]);

bot.dialog('/saveName', [
    (session) => {
        builder.Prompts.text(session, "Su nombre actual es "+session.userData.name+". ¿Cual quiere que sea su nuevo nombre?");
    },
    (session, results) => {
        //Asigno nuevo nombre para la session. Desde aqui guardar en la base de datos
        session.userData.name = results.response;
        session.endDialog("Muy bien " + session.userData.name);
    }
]);

bot.dialog('/uploadImage', [
    (session) => {
        builder.Prompts.attachment(session, "Seleccione una imagen para subir");
    },
    (session, results) => {
        //results.response:[ { name: '', contentType: '',contentUrl: '' } ]        
        session.endDialog();
    }
]);

