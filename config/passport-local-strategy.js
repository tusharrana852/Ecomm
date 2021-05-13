const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


//create local strategy for  authentication
passport.use(new LocalStrategy({
    usernameField:'email'
},
   function(email, password, done){
       User.findOne({email:email},function(err,user){
          if(err){return done(err);}
          
          if(!user || user.password!=password){
              console.log('invalid password');
              return done(null, false);
          }
          return done(null, user);
       });
       
    }
));

//Seralising the user which key has to be put on the cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
});
      
//Deseralised the user from the key in the cookie
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports= passport;
      
