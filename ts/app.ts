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
bot.set('localizerSettings', {
    defaultLocale: "es" 
});
server.post('/api/messages', connector.listen());

var model = process.env.MODEL;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

dialog.matches('greeting', [
    (session, args) => {
       
        var platform = session.message.source
        var platformDataUserData = session.message.address.user;

        var user = new userBot.User(platform, process.env.ACCESS_TOKEN);
        user.debug = false;
        var userData = user.getUser(platformDataUserData);
        
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
    
    (session, args) => {    
        let options = {
            maxRetries : 3,
            retryPrompt : ["¿Esa no es una opcion valida?","Mejor una de las opciones validas"]
        }
        builder.Prompts.choice(session, "¿Que desea hacer?", ["Cambiar mi nombre", "Subir una imagen", "Validar email", "Cancelar"], options);
    },

    (session, results) => {

        if(results.score === 1){
            switch(results.response.entity){
                case "Cambiar mi nombre":
                    session.beginDialog('/saveName');
                break;
                case "Subir una imagen":
                    session.beginDialog('/uploadImage');
                break;  
                case "Cancelar":
                    session.endDialog("Muy bien");
                break;   
                case "Validar email":
                     session.beginDialog('/validar');
                break;                                            
                default:
                    session.endDialog();
                break;
            }
        }else{
            session.endDialog("No reconocemos ninguna de las opciones ingresadas");
        }
        
    }, 
]);

bot.dialog('/saveName', [
    (session, args, next) => {
        
        builder.Prompts.text(session, "Su nombre actual es "+session.userData.name+". ¿Cual quiere que sea su nuevo nombre?");
    },
    (session, results, next) => {
        //Defino nueva informacion para guardar
        session.userData.name = results.response;
        userObj.updateUser({
            "id" : session.userData.id,
            "name" : session.userData.name
        });        
        
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



bot.dialog('/validarEmail', builder.DialogAction.validatedPrompt(builder.PromptType.text, function (response) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(response);
}));

bot.dialog('/validar', [
    (session, results) => {
        

        let options = {
            maxRetries : 3,
            prompt: "Ingrese su email",
            retryPrompt : ["¿Esa no es una opcion valida?","Mejor una de las opciones validas"]
        }        
        session.beginDialog('/validarEmail', options);

    },

    (session, results) => {
        
        if(results.resumed == 0){
            session.endDialog(results.response);
        }else{
            session.endDialog("FIN");
        }

    },

]);



