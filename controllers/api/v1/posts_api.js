const post = require('../../../models/post');
const user = require('../../../models/user');
const comment = require('../../../models/comment');



module.exports.index = async function(req,res){
    let posts= await post.find({})
    .populate('user')
    .populate({path: 'comments',populate:{
      path: 'user'
    }});
   
    let users= await user.find({});
    res.json(200,{
        posts:posts,
        message:"success"
    });
}

module.exports.destroy= async function(req,res){
    try {
       let posts= await post.findById(req.params.id);
       // .id means that converting the id into the string 
       if(posts.user==req.user.id){
          posts.remove();
          await comment.deleteMany({post:req.params.id});
          return res.json(200,{
             posts:posts,
             message:"success"
          });
       }else{
          return res.json(401,{
              message:"You cannot delete this post"
          });
       }
        

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"internal server error"
        })             
    }
 }

