const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path= require('path');
const expressLayouts =require('express-ejs-layouts');
const db=  require('./config/mongoose')
const user= require('./models/user');
const flash = require('connect-flash');
const mongoose= require('mongoose');


//use for session cookie
const session= require('express-session');
const passport= require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware')


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



app.use(session({
    name:'ecommerce',
    secret:'hello world',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection ,
       // collection: 'session',
        autoRemove: 'disable'

    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(passport.setAuthenticated);


app.use('/',require('./routes'));

const port = process.env.PORT||3000;

app.listen(port,(err)=>{
    if(err){console.log(`server error ${err}`);
    return;
}
console.log(`Server is connected to port ${port}`)
})