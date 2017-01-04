"use strict";
var Conversation;
(function (Conversation) {
    function hello(bot) {
        bot.dialog('/', (session) => {
            session.send("Hello World");
        });
    }
    Conversation.hello = hello;
    ;
})(Conversation = exports.Conversation || (exports.Conversation = {}));
//# sourceMappingURL=conversation.js.map