var builder = require('botbuilder');

export module InputUnknown {
    export function dialog() {
            
        const dialog = [
            (session, aiResult) => {
                console.log('InputUnknown', aiResult);
                session.endDialog(aiResult.fulfillment.speech);
            }
        ]//var dialog
        
        return dialog;    
    }
}
