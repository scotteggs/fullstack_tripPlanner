var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = mongoose.connect('mongodb://localhost/wikistack').connection;
db.on('error', function (err) {
	console.error('mongodb connection error', err);
});



//schema
var placeSchema = new mongoose.Schema({
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	phone: {
		type: String
	},
	location: {
		type: [Number]
	}
})

var hotelSchema = new mongoose.Schema({
	name: {
		type: String
	},
	place: [placeSchema],
	num_stars: {
		type: Number,
		enum: [1,2,3,4,5]
	},
	amenities: {
		type: String
	}
})

var activitySchema = new mongoose.Schema({
	name: {
		type: String
	},
	place: [placeSchema],
	age_range: {
		type: String
	}
})

var restaurantSchema = new mongoose.Schema({
	name: {
		type: String
	},
	place: [placeSchema],
	cuisines: {
		type: String
	},
	price: {
		type: Number,
		enum: [1,2,3,4,5]
	}
})

module.exports = {
		Place: mongoose.model('Place', placeSchema),
		Activity: mongoose.model('Activity', activitySchema),
		Hotel: mongoose.model('Hotel', hotelSchema),
		Restaurant: mongoose.model('Restaurant', restaurantSchema)

}







