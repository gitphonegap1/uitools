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

app.listen(PORT,()=>{
    console.info('Server is running on the PORT :: '+PORT);
})
