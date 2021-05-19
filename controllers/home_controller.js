const post = require('../models/post');
const user = require('../models/user');

module.exports.home=function(req,res){
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
  post.find({}).populate('user')
  .populate({path: 'comments',populate:{
    path: 'user'
  }})
  .exec((err,post)=>{
    if(err){console.log(err);
    return;}
    console.log('populated user'+post);
    user.find({},(err,user)=>{
      if(err){console.log(err);
      return;}
      return res.render('home',
      {title:"Home", H1:"Aws Dynamo", posts:post, all_user:user});
    })
    
  });
    
}

