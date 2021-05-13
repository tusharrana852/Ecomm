const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path= require('path');
const expressLayouts =require('express-ejs-layouts');
const db=  require('./config/mongoose')
const user= require('./models/user');

//use for session cookie
const session= require('express-session');
const passport= require('passport');
const passportlocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



app.use(session({
    name:'ecommerce',
    secret:'hello world',
    saveUninitialized: true,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
    
}))
app.use(express.static('./assets'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

const port = process.env.PORT||3000;

app.listen(port,(err)=>{
    if(err){console.log(`server error ${err}`);
    return;
}
console.log(`Server is connected to port ${port}`)
})