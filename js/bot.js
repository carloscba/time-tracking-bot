"use strict";
var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var dotenv = require('dotenv').config();
//DIALOGS
const input_welcome_1 = require("./dialogs/input.welcome");
const input_unknown_1 = require("./dialogs/input.unknown");
const input_task_1 = require("./dialogs/input.task");
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
        console.log('isAttachment', isAttachment);
        if (!isAttachment) {
            session.sendTyping();
            var request = botai.textRequest(msg, {
                sessionId: sessionId
            });
            request.on('response', function (response) {
                try {
                    let action = response.result.action;
                    let fulfillment = response.result.fulfillment;
                    let score = response.result.score;
                    console.log('action', action);
                    console.log('score', score);
                    session.endDialog();
                    session.beginDialog(action, fulfillment, score);
                }
                catch (e) {
                    console.log('request.on response error', e);
                    session.send('Error on response');
                }
            }); //request.on('response')
            request.on('error', function (error) {
                console.log('request.on error', error);
                session.send('Error on response');
            }); //request.on('error')
            request.end();
        }
        else {
        } //if(!isAttachment)
    },
]);
bot.dialog('input.welcome', input_welcome_1.InputWelcome.dialog());
bot.dialog('input.unknown', input_unknown_1.InputUnknown.dialog());
bot.dialog('input.task', input_task_1.InputTask.dialog());
//# sourceMappingURL=bot.js.map