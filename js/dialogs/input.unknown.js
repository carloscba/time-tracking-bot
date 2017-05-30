"use strict";
var builder = require('botbuilder');
var InputUnknown;
(function (InputUnknown) {
    function dialog() {
        const dialog = [
            (session, fulfillment) => {
                session.endDialog(fulfillment.speech);
            }
        ]; //var dialog
        return dialog;
    }
    InputUnknown.dialog = dialog;
})(InputUnknown = exports.InputUnknown || (exports.InputUnknown = {}));
//# sourceMappingURL=input.unknown.js.map