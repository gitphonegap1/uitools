/* eslint-disable */
const express = require('express');
const PORT = process.env.port || 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/hello',(req,res,next)=>{
    res.send('Welcome to uitools_services with firebase');
})


app.listen(PORT,()=>{
    console.info('Server is running on the PORT :: '+PORT);
})

