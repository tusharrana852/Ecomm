const user = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession= async function(req,res){
    try {
        let users = await user.findOne({email:req.body.email});
        
        if(!users || users.passwords!= req.body.passwords){
            return res.json(422,{
                message:"Invalid username and password"
            });
        }
        return res.status(200).json({
            message:"successful",
            data:{
                token: jwt.sign(users.toJSON(),'secret',{
                    expiresIn:1000000
                })
            }
        });
    } catch (error) {
      console.log(error);
      return res.json(500,{
          message:"internal server error"
      })     
    }
}
