const User= require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile= function(req,res){
    User.findById(req.params.id,(err,user)=>{
        if(err){console.log(err);
        return;}
        return res.render('user_profile',{title:"user",H1:"Asure Data Factory", profile_user:user});
    });
}

module.exports.update= async function(req,res){

//    if(req.user.id== req.params.id){
//        User.findByIdAndUpdate(req.params.id, req.body,(err,user)=>{
//            return res.redirect('/');
//        });
//    }else{
//        return res.status(401).send('Unathorised');
//    }
   if(req.user.id == req.params.id){
       try {
         let user1 = await User.findById(req.params.id);
         User.uploadedAvatar(req,res,function(err){
             if(err){
                return console.log("error"+err);}
                user1.name = req.body.name;
                user1.email = req.body.email;
             if(req.file){
                 
                if(user1.avatar){
                    // fs.unlinkSync(path.join(__dirname,'..', user1.avatar));
                    fs.rmdirSync(path.join(__dirname,'..', user1.avatar),{recursive:true})
                 }
                 
                 // this is use for saving the avatar path into the database
                user1.avatar =User.avatarPath + '/' + req.file.filename;
                }
            user1.save();
            return res.redirect('back');    
         });
     } catch (error) {
         req.flash("error",err);
         return res.redirect('back');
     }
     
   }else{
       return res.status(401).send('Unathorised');
    }
}
module.exports.delete = function(req,res){
    // if(req.user.id== req.params.id){
        User.findById(req.params.id,(err,user)=>{
         use.remove();
         res.redirect('/');
        });
    }


module.exports.sign_in= function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
     }
    return res.render('user_sign_in',{title: "sign_in"});
}


module.exports.sign_up= function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{title: "sign_up"});
}

//get sign-up data
module.exports.create= function(req,res){
    console.log(req.body.email);
    if(req.body.passwords!=req.body.cpasswords){
        res.redirect('/users/sign-up');
    }
        User.findOne({email:req.body.email},function(err,user){
            if(err){console.log("error"+err);
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log("error"+err);
                return;
                }
                console.log(user);
                return res.redirect('/users/sign-in');
            });
        }else{
            res.redirect('back');
        }
        });
}

//sign in and create session
module.exports.createSession= function(req,res){
    req.flash('success','Logged in Successfully')
    return res.redirect('back');
}

//create controller for sign-out

module.exports.destroy= function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully')

    res.redirect('/');
}