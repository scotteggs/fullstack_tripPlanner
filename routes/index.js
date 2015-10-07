var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Place = require('../models').Place;
var swig = require('swig');


router.get('/', function (req, res) {
	console.log("IN GET /"); 
	Hotel.find({}).exec().then(function(hotels) {
		console.log("First db call");
    Restaurant.find({}).exec().then(function(restaurants) {
        Activity.find({}).exec().then(function(activities) {
        	console.log("hotels =======> ", hotels)
            res.render('index',
                {all_hotels: hotels,
                 all_restaurants: restaurants,
                 all_activities: activities
                });
        }).then(null, console.log);
    }).then(null, console.log);
	}).then(null, console.log);
});




module.exports = router;