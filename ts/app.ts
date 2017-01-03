var restify = require('restify');
var builder = require('botbuilder');
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
        session.userData.name = session.message.user.name;
        session.send("Buen dia " + session.userData.name)
        session.beginDialog('/userData');
    },
]);

dialog.matches('None', [
    (session) => {
        session.send("No se ha reconocido el texto ingresado");
    }
]);


bot.dialog('/userData', [
    
    (session) => {
        builder.Prompts.choice(session, "¿Necesitas ayuda?", ["Si","No"]);
    },
    (session, results) => {
        if (results.response.entity == "Si") {
            builder.Prompts.text(session, '¿Cual es su nombre?');
        } else {
            session.send("KO");
        }
    }, 
    /*
    function (session) {
        
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
    */
]);

