module.exports.profile= function(req,res){
    return res.render('user_profile',{title:"user",H1:"Asure Data Factory"});
}

module.exports.sign_in= function(teq, res){
    return res.render('user_sign_in',{title: sign_in});
}


module.exports.sign_up= function(teq, res){
    return res.render('user_sign_up',{title: sign_up});
}