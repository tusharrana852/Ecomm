

module.exports.home=function(req,res){
   // return res.send("express is setup");
   console.log(req.cookies.id);
  // res.cookie('id',"kjh");
    return res.render('home',{title:"Home",H1:"Aws Dynamo"});
}

