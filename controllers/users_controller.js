const User= require('../models/user');

module.exports.profile= function(req,res){
    return res.render('user_profile',{title:"user",H1:"Asure Data Factory"});
}

module.exports.sign_in= function(req, res){
    return res.render('user_sign_in',{title: "sign_in"});
}


module.exports.sign_up= function(req, res){
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
            })
        }else{
            res.redirect('back');
        }
        })
    

    

}

//sign in and create session
module.exports.createSession= function(req,res){
    return res.redirect('back');
}