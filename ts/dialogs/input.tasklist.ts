var builder = require('botbuilder');

//Users
import {Client as clientObj} from "../class/client";

export module InputTaskList {
    export function dialog() {
        
        return false;

        var client = new clientObj.Client();

        const dialog = [

            //list task
            (session, aiResult) => {
                session.sendTyping();

                client.getAll().on('child_added', function(snapshot) {
                    session.send(snapshot.val().name);
                });

                session.endDialog();
            },

        ];//var dialog
        
        return dialog;
    }
}
