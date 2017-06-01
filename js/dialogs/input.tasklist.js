"use strict";
var builder = require('botbuilder');
//Users
const client_1 = require("../class/client");
var InputTaskList;
(function (InputTaskList) {
    function dialog() {
        return false;
        var client = new client_1.Client.Client();
        const dialog = [
            //list task
            (session, aiResult) => {
                session.sendTyping();
                client.getAll().on('child_added', function (snapshot) {
                    session.send(snapshot.val().name);
                });
                session.endDialog();
            },
        ]; //var dialog
        return dialog;
    }
    InputTaskList.dialog = dialog;
})(InputTaskList = exports.InputTaskList || (exports.InputTaskList = {}));
//# sourceMappingURL=input.tasklist.js.map