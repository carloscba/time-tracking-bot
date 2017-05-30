var builder = require('botbuilder');

export module InputUnknown {
    export function dialog() {
            
        const dialog = [
            (session, fulfillment) => {
                session.endDialog(fulfillment.speech);
            }
        ]//var dialog
        
        return dialog;    
    }
}
