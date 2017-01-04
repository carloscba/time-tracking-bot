export module Conversation{
 
    export function hello(bot):void{
        
        bot.dialog('/', (session) => {
            session.send("Hello World");
        });

    };

}
