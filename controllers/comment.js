const comment =require('../models/comment');
const post = require('../models/post');

module.exports.create= function(req,res){
   post.findById(req.body.post,(err,post)=>{
      if(err){console.log('error in finding post'+err);
      return;}
      comment.create({
          content: req.body.content,
          user: req.user._id, 
          post: req.body.post
      },(err, comment)=>{
        if(err){console.log('error in creating post'+err);
        return;}
        post.comments.push(comment);
       
        // before save it present in the local memory
        post.save();
        res.redirect('/');
      });
   });
}

module.exports.destroy= function(req,res){
   comment.findById(req.params.id,(err,comment)=>{
      if(err){console.log('error in finding the comment'+err);
       return;}
      if(comment.user==req.user.id){
         let postId= comment.post;
         comment.remove();
            post.findByIdAndUpdate(req.params.id, {$pull: {comment: req.params.id}}, (err,post)=>{
            return res.redirect('/');
         });
      }else{
         return res.redirect('/');
      }
   })
}