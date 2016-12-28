"use strict";
var Luis;
(function (Luis) {
    function greeting() {
        return [
            function (session, args, next) {
                session.send("Hola Mundo");
            },
            function (session, args, next) {
                session.send("Hola Mundo 2");
            }
        ];
    }
    Luis.greeting = greeting;
    ;
})(Luis = exports.Luis || (exports.Luis = {}));
//# sourceMappingURL=luis.js.map