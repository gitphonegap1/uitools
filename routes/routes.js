/* eslint-disable */
module.exports = (app) =>{
	const uitools = require('../controller/controller.js');
	app.get('/uitools/getAllApplications',uitools.getAllApplications);
	app.get('/uitools/getChaptersByApplication',uitools.getChaptersByApplication);
	app.post('/uitools/createPost',uitools.createPost);
	app.get('/uitools/getPosts',uitools.getPosts);
}