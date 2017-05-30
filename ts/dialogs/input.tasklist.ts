var builder = require('botbuilder');

export module InputTaskList {
    export function dialog() {
            
        const dialog = [

            //list task
            (session, aiResult) => {
                const hasTask = true; //pending
                if(hasTask){
                    session.endDialog('Listado de tasks');
                }else{
                    session.endDialog('No tiene tareas pendientes');
                }
            },

        ];//var dialog
        
        return dialog;
    }
}
