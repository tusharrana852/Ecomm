const passport =require('passport');
const OAuth2Strategy= require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/user');

passport.use(new OAuth2Strategy({
    clientID: "699368578856-lh4ubfl3lui5p5a4v5ln3fan5p0aq9t7.apps.googleusercontent.com",
    clientSecret: "P3KgGfFUoxoaBA06dqaGByMK",
    callbackURL: "http://localhost:3000/users/auth/google/callback"
   },
  async function(accessToken, refreshToken, profile, done) {
         try {
            let val= await user.findOne({email:profile.emails[0].value})
            console.log(profile);
            if(val){return done(null, val);}
            else{
               let va = await user.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passwords: crypto.randomBytes(20).toString('hex')
                });
                return done(null,user); 
                }  
         } catch (error) {
             console.log("error in passport-google-oauth"+err);
         }
    }));    
    
  


module.exports= passport;