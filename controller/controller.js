/* eslint-disable */
const upl = require('../app.js');


exports.getAllApplications = (req, res)=> {
	var query = 'select * from applications order by id';
	upl.client.query(query,(err,data)=>{
		 if(err){
			 res.send(err)
		 }else{
			 var list = data.rows;
				res.send(list);
		 }
	});
}


exports.getChaptersByApplication = (req, res)=> {
	var rd = req.query;
	var id = rd.applicationId;
	var qr = 'select chapters.id, chapters.application_id as "applicationId", applications.name as "applicationName", chapters.chapter_name as "chapterName" from chapters join applications on chapters.application_id = applications.id';
	if(id){
		qr = qr + ' where application_id = '+id
	}
	upl.client.query(qr,(err,data)=>{
		if(err){

		}else{
			var list = data.rows;
			   res.send(list);
		}
	})
}

exports.createPost = (req,res)=>{
	if(!req.body) {
		return res.status(400).send({
			  message: "Content can not be empty"
	   });
	}
	var kys = req.body;
	// console.log(kys.title);
	// var qry = 'Insert into posts (title,editor_content,description,topic_id) values ("'+kys.title+'","'+kys.editor_content+'","'+kys.description+'",'+kys["topic_id"]+')';
	var eny = Buffer.from(kys.editorContent).toString('base64');
	// var todayDate = new Date().toISOString().slice(0, 10);
	var todayDate = new Date().toISOString();
	// console.log(todayDate);
	var qry = "INSERT INTO posts(title,editor_content,description,topic_id,publisheddate,updateddate) VALUES('"+kys.title+"','"+eny+"','"+kys.descript
	ion+"',"+kys.topicId+",'"+todayDate+"','"+todayDate+"')";
	if(kys.id){
		var qry = "update posts set title='"+kys.title+"', editor_content='"+eny+"', description='"+kys.description+"', topic_id='"+kys.topicId+"',updateddate='"+todayDate+"' where id="+kys.id;
	}
	// console.log(qry);
	upl.client.query(qry,(err,data)=>{
		if(err){
			res.send({status:'Please check data once'});
		}else{
			res.send({status:'Post saved successfully'});
		}
	})
}

exports.getPosts = (req, res)=> {
	var rd = req.query;
	var id = rd.postId;

	var qry = 'select posts.id,posts.title, posts.description, posts.topic_id as "topicId", chapters.chaptername as "topicName", chapters.applicationname as "applicationName", chapters.applicationid as "applicationId", chapters.applcolor as "applicationColor",posts.publisheddate as "publishedDate", posts.updateddate as "updatedDate", posts.editor_content as "editorContent" from posts join (select chapters.id, chapters.application_id as "applicationid", applications.name as "applicationname", applications.color as "applcolor", chapters.chapter_name as "chaptername" from chapters join applications on chapters.application_id = applications.id) as chapters on chapters.id = posts.topic_id';
	if(id){
		qry = qry +' where posts.id='+id;
	}
	upl.client.query(qry,(err,data)=>{
		if(err){

		}else{
			var list = data.rows;
			list.forEach(function(x){
				var dyc = Buffer.from(x['editorContent'], 'base64').toString();
				x.editorContent = dyc;
			})
			res.send(list);
		}
	})
}
