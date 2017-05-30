var builder = require('botbuilder');

export module InputTask {
    export function dialog() {
            
        const dialog = [

            //Prompt client name
            (session, aiResult) => {
                builder.Prompts.text(session, '1/2 - Indica el cliente');
            },
            
            //save client name
            (session, results, next) => {
                console.log('1/2 - typeof(results.response)', typeof(results.response));
                if(typeof(results.response) === 'string'){
                    console.log('1/2 - results.response', results.response);
                    session.dialogData.client = results.response;
                    next();
                }
            },

            //prompt task name
            (session, results) => {
                builder.Prompts.text(session, '2/2 - Indica el nombre de la tarea');         
            },

            //save task name
            (session, results, next) => {
                console.log('2/2 - typeof(results.response)', typeof(results.response));
                if(typeof(results.response) === 'string'){
                    console.log('2/2 - results.response', results.response);
                    session.dialogData.name = results.response;
                    next();
                }
            },            
            
            //end dialog
            (session, results) => {
                session.endDialog('Se ha creado la nueva tarea');
                console.log(session.dialogData);
            }

        ];//var dialog
        
        return dialog;
    }
}
