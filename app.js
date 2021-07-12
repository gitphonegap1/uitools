/* eslint-disable */
// const express = require('express');

/*const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/hello',(req,res,next)=>{
    res.send('Welcome to uitools_services with firebase');
})


app.listen(PORT,()=>{
    console.info('Server is running on the PORT :: '+PORT);
})*/


/* eslint-disable */
const functions = require("firebase-functions");
const express = require('express');
const validator = require('email-validator');
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: '35.222.67.79',
  database: 'uitools',
  password: 'vwp3885',
  port: 5432,
 });

var cors = require('cors');
module.exports.client = pool;
app.use(cors({origin: '*'}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/hello',(req,res,next)=>{
    //res.send('Welcome to uitools_services with firebase');
    var query = 'select * from applications order by id';
    pool.query(query,(err,data)=>{
		 if(err){

		 }else{
			 var list = data.rows;
				res.send(list);
		 }
	});
})

app.post('/validateEmail',(req,res,next)=>{
    // console.log(req);
    const postData = req.body;
    if(postData.email){
        res.json({'status':validator.validate(postData.email)})
    }else{
        res.status(500).json({'status':'wrong request input'});
    }
})

app.listen(PORT,()=>{
    console.info('Server is running on the PORT :: '+PORT);
})

// require('./routes/routes.js')(app);

exports.app = functions.https.onRequest(app);
