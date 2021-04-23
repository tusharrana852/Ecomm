const express = require('express');
const app = express();



app.get('/',(req,res)=>{
     res.send('hello');
})

const port = process.env.PORT||3000;

app.listen(port,(err)=>{
    if(err){console.log(`server error ${err}`);
    return;
}
console.log(`Server is connected to port ${port}`)
})