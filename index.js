const express = require('express');
const app = express();
const path= require('path');
const expressLayouts =require('express-ejs-layouts');
const db=  require('./config/mongoose')
const user= require('./models/user');

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes'));

app.use(express.static('./assets'));



const port = process.env.PORT||3000;

app.listen(port,(err)=>{
    if(err){console.log(`server error ${err}`);
    return;
}
console.log(`Server is connected to port ${port}`)
})