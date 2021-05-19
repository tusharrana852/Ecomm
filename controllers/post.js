const post= require('../models/post');
const comment = require('../models/comment');


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

module.exports.destroy= function(req,res){
   post.findById(req.params.id,(err,post)=>{
        if(err){console.log('error in finding the post'+err);
      return;}
      // .id means that converting the id into the string 
      if(post.user== req.user.id){
        post.remove();
        comment.deleteMany({post:req.params.id},(err)=>{
          if(err){console.log('error in deleting');
         return;}
         return res.redirect('/');
        })
      }else{
         return res.redirect('/');
      }
   });
}