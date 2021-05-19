const post = require('../models/post');

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
  post.find({}).populate('user').exec((err,post)=>{
    if(err){console.log(err);
    return;}
    console.log('populated user'+post);
    return res.render('home',
    {title:"Home", H1:"Aws Dynamo", posts:post});
  });
    
}

