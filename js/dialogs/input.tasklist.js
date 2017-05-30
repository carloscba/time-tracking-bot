"use strict";
var builder = require('botbuilder');
var InputTaskList;
(function (InputTaskList) {
    function dialog() {
        const dialog = [
            //list task
            (session, aiResult) => {
                const hasTask = true; //pending
                if (hasTask) {
                    session.endDialog('Listado de tasks');
                }
                else {
                    session.endDialog('No tiene tareas pendientes');
                }
            },
        ]; //var dialog
        return dialog;
    }
    InputTaskList.dialog = dialog;
})(InputTaskList = exports.InputTaskList || (exports.InputTaskList = {}));
//# sourceMappingURL=input.tasklist.js.map