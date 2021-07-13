/* eslint-disable */
const express = require('express');
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const pool = new Pool({
  user: 'uitools',
  host: 'aar99c3um1obaa.crbdg5ecijwz.ap-south-1.rds.amazonaws.com',
  database: 'ebdb',
  password: 'hasya2019',
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


app.listen(PORT,()=>{
    console.info('Server is running on the PORT :: '+PORT);
})
