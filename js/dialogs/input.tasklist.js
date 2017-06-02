"use strict";
var builder = require('botbuilder');
var winston = require('winston');
winston.level = 'debug';
//Users
const client_1 = require("../class/client");
const task_1 = require("../class/task");
var InputTaskList;
(function (InputTaskList) {
    function dialog() {
        const client = new client_1.Client.Client();
        const task = new task_1.Task.Task();
        const dialog = [
            //list task
            (session, aiResult) => {
                session.sendTyping();
                task.get(null).then(function (response) {
                    winston.log('debug', 'list of tasks', response.data.results);
                    let tasks = response.data.results;
                    tasks.map(function (task) {
                        session.send(task.description);
                    });
                    session.endDialog();
                }).catch(function (error) {
                    winston.log('debug', 'Error on list tasks');
                    session.endDialog('Se ha producido un error al listar las tareas');
                });
            },
        ]; //var dialog
        return dialog;
    }
    InputTaskList.dialog = dialog;
})(InputTaskList = exports.InputTaskList || (exports.InputTaskList = {}));
//# sourceMappingURL=input.tasklist.js.map