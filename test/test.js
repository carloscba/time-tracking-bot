var expect = require('expect');

const user_1 = require("../js/class/user");
var user = new user_1.User.User();

describe('User Class', function() {
    
    let idUser = 3;

    it('List users', function(done) {  
        user.get().then(function(response){
            if(response.data.count > 0){
                done()
            }
        }).catch(function(error){
            done(error)
        });;
    });

    it('Exist user number: ' + idUser, function(done) {  
        user.get(idUser).then(function(response){
            if(response.data.id === idUser){
                done()
            }
        }).catch(function(error){
            done(error)
        });;
    });

    it('Update user: ' + idUser, function(done) {
        let randomNumber = Math.round(Math.random * 5);
        user.put(idUser, {
            name : 'name-'+randomNumber,
            platform_id : 714243435
        }).then(function(response){
            if(response.data.name === 'name-'+randomNumber){
                done()
            }
        }).catch(function(error){
            done(error)
        });;
    });    
 
});