const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecomm_proj', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function(){
    console.log("successfully connected");
})

mongoose.exports=db;