var builder = require('botbuilder');

export module InputWelcome {
    export function dialog() {
            
        const dialog = [
            (session, aiResult) => {
                session.endDialog(aiResult.fulfillment.speech);
            }
        ];//var dialog
        
        return dialog;
    }
}
