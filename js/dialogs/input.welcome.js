"use strict";
var builder = require('botbuilder');
var InputWelcome;
(function (InputWelcome) {
    function dialog() {
        const dialog = [
            (session, aiResult) => {
                session.endDialog(aiResult.fulfillment.speech);
            }
        ]; //var dialog
        return dialog;
    }
    InputWelcome.dialog = dialog;
})(InputWelcome = exports.InputWelcome || (exports.InputWelcome = {}));
//# sourceMappingURL=input.welcome.js.map