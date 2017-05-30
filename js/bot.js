"use strict";
var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var dotenv = require('dotenv').config();
//DIALOGS
const input_welcome_1 = require("./dialogs/input.welcome");
const input_unknown_1 = require("./dialogs/input.unknown");
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
        console.log('session.message', session.message);
        let msg = session.message.text; //input by user
        let sessionId = session.message.address.id; //set session for user
        console.log('session.message.attachments.length', session.message.attachments.length);
        let isAttachment = (session.message.attachments.length > 0); //set text as input or attachment
        console.log('isAttachment', isAttachment);
        if (!isAttachment) {
            session.sendTyping();
            var request = botai.textRequest(msg, {
                sessionId: sessionId
            });
            request.on('response', function (response) {
                try {
                    let action = response.result.action;
                    console.log('action', action);
                    let fulfillment = response.result.fulfillment;
                    session.endDialog();
                    session.beginDialog(action, fulfillment);
                }
                catch (e) {
                    console.log('request.on response error', e);
                    session.send('Error on response');
                }
            }); //request.on('response'
            request.on('error', function (error) {
                console.log('request.on error', error);
                session.send('Error on response');
            }); //request.on('error'
            request.end();
        } //if(typeof(msg) === 'string')
    },
]);
bot.dialog('input.welcome', input_welcome_1.InputWelcome.dialog());
bot.dialog('input.unknown', input_unknown_1.InputUnknown.dialog());
//# sourceMappingURL=bot.js.map