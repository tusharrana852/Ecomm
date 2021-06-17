const Post= require('../models/post');
const comment = require('../models/comment');


module.exports.create= async function(req,res){
   try {
      let post= await Post.create({
         content: req.body.content,
         user: req.user._id});
         
         if(req.xhr){
            return res.status(200).json({
               data:{
                  post: post._id
               },
               message:"post created"
            });
         }

     req.flash('success','post created');
      return res.redirect('back');   
   
   } catch (error) {
     console.log('post created '+error);  
   }
}

module.exports.destroy= async function(req,res){
   try {
      let posts= await Post.findById(req.params.id);
      // .id means that converting the id into the string 
      if(posts.user== req.user.id){
        posts.remove();
        await comment.deleteMany({post:req.params.id});
        req.flash('success','post Deleted');
        return res.redirect('/');
      
      }else{
         return res.redirect('/');
      }   
   } catch (error) {
      console.log(error);
   }
}
