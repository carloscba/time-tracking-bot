var restify = require('restify');
var builder = require('botbuilder');
require('dotenv').config()

import {Conversation} from "./conversation";
import {Luis} from "./luis";

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

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = process.env.MODEL;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);
dialog.matches('greeting', [
    
    (session, args, next) => {
        builder.Prompts.choice(session, "¿Necesita ayuda?", ["Si","No"]);
    },

    (session, results) => {
        if (results.response.entity == "Si") {
            session.beginDialog('/userData');
        } else {
            session.send("KO");
        }
    }    
]);

bot.dialog('/userData', [
    function (session) {
        builder.Prompts.text(session, '¿Cual es su nombre?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

dialog.matches('None', [
    (session) => {
        session.send("No se ha reconocido el texto ingresado");
    }
]);