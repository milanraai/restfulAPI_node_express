var express = require('express');
var router = express.Router();
var data  = require('../public/javascripts/data.js')
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = "mongodb://localhost:27017/sampleCustomers";
var MongoClient = mongodb.MongoClient;

/* GET users listing. */

// without promise handling

router.get('/', function(req, res) {

	var renderFail = function(){
		res.render('users', {
			title: "Customer List",
			dbFail: "failed to connect to server ",
			hide: "",
			show: "hidden"
		});
	};

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log("unable to connect");
			renderFail();
		} else {
			return new Promise(function(resolve, reject) {

				console.log("connection established");
				var collection = db.collection("sampleCustomers");

				collection.find({}).toArray(function(err, docs) {

					if(!docs){
						reject("could not find anything");
					} else {
						console.log(docs.length + " records found");
						resolve(docs);
					}
				})

			}).then(function(docs){

				console.log(typeof data);
				console.log("now closing db");
				db.close();
				console.log("rendering the page");
				console.log("**********************************************");
				res.render('users', {
					title: "Customer List",
					list: docs,
					hide: "",
					show: "hidden"
				});
			}).catch(function(err){

				renderFail();
				console.log(err + " error");
			})

			} //end of else
		})
})


router.get('/new', function(req,res,next){

	res.render('users', { title : "Add new user",
		visible : "hidden"});
});


router.get('/:id', function( req, res, next){

	var renderFail = function(){
		res.render('users', {
			title : "ID : " + req.params.id,
			dbFail: "failed to connect to server ",
			hide : "hidden",
			show : "hidden",
		});
	};

	MongoClient.connect(url, function(err, db) {

		console.log("entering search by id")
		if (err) {
			console.log("unable to connect");
			reject(renderFail());
		} else {
			return new Promise(function(resolve, reject) {
				console.log("entered search by id")
				console.log("connection established");
				var collection = db.collection("sampleCustomers");

				collection.findOne({"_id" : objectId(req.params.id) }, function(err, doc){
					assert.equal(null, err);

					console.log(doc);

					resolve(doc);
				})

			}).then(function(docs){
				console.log("**************************************")
				console.log(typeof docs);
				// console.log("now closing db");
				// db.close();
				console.log("rendering the USER DETAIL page");
				res.render('users', {title : "# "  + docs.first_name, 
					data : docs,
					show : "",
					hide : "hidden"});
			}).catch(function(err){

				//renderFail();
				console.log(err + " error");
			})

			} //end of else
		})
})


router.post('/update/:id', function( req, res){

	var item = {

		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		gender : req.body.gender,
		address : req.body.add
	};

	MongoClient.connect(url, function(err, db){

		if(err){
			console.log("unable to connect to database");
		} else {

			return new Promise(function( resolve, reject){

				console.log("update connecton made");

				var collection = db.collection("sampleCustomers");

				collection.updateOne({"_id" : objectId(req.params.id)}, {$set: item}, function(err, result){

					if(err){

						reject(err + " UPDATE error");
					} else{

						resolve(result + " UPDATE completed");
					}
				})
			}).then(function(result){

				console.log(result);
				console.log("closing UPDATE db");
				db.close();

				res.redirect(303, '/users');
			}).catch(function(){

				console.log(err + " UPDATE error")
			})
		}
	})

})


router.post('/addNew', function( req, res){

	var item = {
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		gender : req.body.gender,
		address : req.body.address
	};  

	MongoClient.connect(url, function(err, db){

		if(err){
			console.log("unable to connect to database")
		} else {

			var collection = db.collection("sampleCustomers");

			collection.insertOne(item, function(err, result){

				console.log("INSERTed one record");

				console.log("now closing INSERT db")
				db.close();

				res.redirect('/users/');

			})
		}

	})

})


router.get('/:id/edit', function( req, res){

	var renderFail = function(){
		res.render('editUser', {
			title: "Edit List",
			dbFail: "failed to connect to server "
		});
	};

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log("unable to connect");
			renderFail();
		} else {
			return new Promise(function(resolve, reject) {

				console.log("EDIT connection established");
				var collection = db.collection("sampleCustomers");

				collection.findOne({"_id" : objectId(req.params.id)}, function(err, docs){

					if(docs){
						console.log("edit route found records of : " + docs.first_name  );
						resolve(docs);
					} else {
						reject("there was nothing to be found")
					}
				})

				// insert end here
			}).then(function(doc){

				console.log(doc);
				console.log("now closing EDIT db");
				db.close();
				console.log("rendering the page");
				console.log("**********************************************");
				res.render('editUser', {
					title: "Edit users",
					user: doc
				});
			}).catch(function(err){

				renderFail();
				console.log(err + " error");
			})

			} //end of else
		})

})


router.post('/delete/:id', function( req, res){ 
	var id = req.params.id;

var idParam = req.params.idParam;
	console.log(objectId(idParam));

	MongoClient.connect(url, function(err, db){

		assert.equal(null, err)

			console.log("DELETE connection ready");

			db.collection("sampleCustomers").deleteOne({"_id" : objectId(id)}, function(err, result){

				assert.equal(null, err);

				console.log("DELETED one record");

				console.log("now closing DELETE connection")
				db.close();

				res.redirect('/users');

			})
	})
})


module.exports = router;
