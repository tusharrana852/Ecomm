const mongoose= require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    passwords:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    timestamp: { type: Date, default: Date.now},

  
});

const User = mongoose.model('User', userSchema);

module.exports= User;