const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


//create local strategy for  authentication
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'passwords'
},
   function(email, passwords, done){
       User.findOne({email:email},function(err,user){
          if(err){console.log('error in finding user');
            return done(err);}
          
          if(!user || user.passwords!=passwords){
              console.log('invalid password');
              return done(null, false);
          }
          return done(null, user);
       });
       
    }
));

//Seralising the user which key has to be put on the cookie
  passport.serializeUser(function(user, done) {
    console.log(user.id);
    done(null, user.id);

});
      
//Deseralised the user from the key in the cookie
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err){
          console.log('Error in finding user --> Passport');
          return done(err);
      }

      return done(null, user);
  });
});

//check if user authenticated
passport.checkAuthentication= function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  //if user not sign in
  return res.redirect('/users/sign-in');
}

passport.setAuthenticated = function(req,res, next){
  if(req.isAuthenticated()){
    //req.user contain current sign-in user we are just sending it to the locals for the views
    res.locals.user= req.user;
  }
  next();
} 
module.exports= passport;
      
