module.exports.profile= function(req,res){
    console.log("bye");
    return res.render('user_profile',{title:"user",H1:"Asure Data Factory"});
}