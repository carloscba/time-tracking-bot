export module Luis{
 
    export function greeting(){
        
        return [
            (session, args, next) => {
                session.send("Hola Mundo")
            },

            (session, args, next) => {
                session.send("Hola Mundo 2")
            }
        ]
            
    
    };

}
