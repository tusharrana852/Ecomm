const post= require('../models/post');


module.exports.create= function(req,res){
   post.create({
       content: req.body.content,
       user: req.user._id
   },(err,post)=>{
      if(err){console.log('error in creating post'+err);
    return;}
    console.log(post);
    return res.redirect('back');
   });
}

