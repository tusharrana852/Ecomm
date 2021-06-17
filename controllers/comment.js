const comment =require('../models/comment');
const post = require('../models/post');

module.exports.create= async function(req,res){
   try {
      let posts= await post.findById(req.body.post)
   
   let user_comment= await comment.create({
          content: req.body.content,
          user: req.user._id, 
          post: req.body.post
      });
        
      posts.comments.push(user_comment);
       
        // before save it present in the local memory
        posts.save();
        req.flash('success','Comment created');

        res.redirect('/');   
   } catch (error) {
      console.log(error);
   }
   
}

module.exports.destroy= async function(req,res){

   try {
      let user_comment= await comment.findById(req.params.id);
      
      if(user_comment.user==req.user.id){
            let postId= user_comment.post;
            user_comment.remove();
               
            await post.findByIdAndUpdate(req.params.id, {$pull: {comment: req.params.id}});
            req.flash('success','Comment Deleted');

               
            return res.redirect('/');
         }else{
            return res.redirect('/');
         }   
   } catch (error) {
      console.log(error);
   }
   
}