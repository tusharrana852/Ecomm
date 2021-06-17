const post = require('../models/post');
const user = require('../models/user');

module.exports.home= async function(req,res){
  //  return res.send("express is setup");
  //  console.log(req.cookies.id);
  //  res.cookie('id',"kjh");
  // post.find({},(err,post)=>{
  //   if(err){console.log(err);
  //   return;}
  //   return res.render('home',
  //   {title:"Home", H1:"Aws Dynamo", posts:post});
  // })

  //populate the user object
  try {
    let posts= await post.find({})
    .populate('user')
    .populate({path: 'comments',populate:{
      path: 'user'
    }});
   
    let users= await user.find({});
  
        return res.render('home',
        {title:"Home", H1:"Aws Dynamo", posts:posts, all_user:users});  
  } catch (error) {
      console.log(error);    
  }
   
}

