

module.exports.home=function(req,res){
   // return res.send("express is setup");
    return res.render('home',{title:"Home",H1:"Aws Dynamo"});
}

