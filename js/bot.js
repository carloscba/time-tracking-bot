"use strict";
var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var dotenv = require('dotenv').config();
var winston = require('winston');
winston.level = 'debug';
//Users
const user_1 = require("./class/user");
//DIALOGS
const input_welcome_1 = require("./dialogs/input.welcome");
const input_unknown_1 = require("./dialogs/input.unknown");
const input_task_1 = require("./dialogs/input.task");
const input_tasklist_1 = require("./dialogs/input.tasklist");
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    winston.log('debug', 'run server');
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
var user = new user_1.User.User();
bot.use({
    botbuilder: function (session, next) {
        console.log('--> session.userData.profile', session.userData.profile);
        if (session.userData.profile === undefined) {
            user.get(3).then(function (response) {
                winston.log('debug', 'SUCCESS user get: ', response.data);
                session.userData.profile = response.data;
                next();
            }).catch(function (error) {
                winston.log('debug', 'ERROR user get: ', error);
                user.post({
                    id: session.message.user.id,
                    name: session.message.user.name
                }).then(function (response) {
                    winston.log('debug', 'SUCCESS user add:', response);
                    session.userData.profile = response.data;
                    next();
                }).catch(function (error) {
                    winston.log('debug', 'ERROR user add', error);
                });
            });
        }
        else {
            winston.log('debug', 'User exist: ', session.userData);
            next();
        } //if(session.userData.id === null){
    }
});
bot.dialog('/', [
    (session, args) => {
        winston.log('debug', 'session.userData', session.userData);
        let msg = session.message.text; //input by user
        let sessionId = session.message.address.id; //set session for user
        let isAttachment = (session.message.attachments.length > 0); //set text as input or attachment
        session.sendTyping();
        if (!isAttachment) {
            var request = botai.textRequest(msg, {
                sessionId: sessionId
            });
            request.on('response', function (response) {
                try {
                    let action = response.result.action;
                    let aiResult = response.result;
                    winston.log('debug', 'action', action);
                    winston.log('debug', 'score', aiResult.score);
                    callAction(action, aiResult, session);
                }
                catch (e) {
                    winston.log('debug', 'request.on response error', e);
                    session.send('Error on response');
                }
            }); //request.on('response')
            request.on('error', function (error) {
                winston.log('debug', 'request.on error', error);
                session.send('Error on response');
            }); //request.on('error')
            request.end();
        }
        else {
        } //if(!isAttachment)
    },
]);
let callAction = function (action, aiResult, session) {
    //save unknown query
    if (action === 'input.unknown') {
        session.userData.unknownQuery = {
            'resolvedQuery': aiResult.resolvedQuery
        };
    }
    session.beginDialog(action, aiResult);
};
bot.dialog('input.unknown', input_unknown_1.InputUnknown.dialog());
bot.dialog('input.welcome', input_welcome_1.InputWelcome.dialog());
bot.dialog('input.task', input_task_1.InputTask.dialog());
bot.dialog('input.tasklist', input_tasklist_1.InputTaskList.dialog());
//# sourceMappingURL=bot.js.map