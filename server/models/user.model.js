let mongoose = require('mongoose');
let Joi = require('joi');

let taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		// Use Joi to generate a default value BEFORE task is added
		// in the server endpoint

		// Use Joi to validate before it reaches the db
	},
	date: {
		type: Date,
		required: true,

		// Joi validation on API endpoint
	},
	time: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: false,
	}
});

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: function(value, respond) {
			let schema = Joi.string().alphanum();

			Joi.validate(value, schema, function(err, value) {
				if (err) {
					respond(false, err.details[0].message);
				} else {
					respond(true);
				}
			});
		},
	},
	password: {
		type: String,
		required: true,
		// validation of password contents will happen before password reaches
		// schema. Password will be hashed before being persisted to db.

	},
	tasks: [taskSchema],
});

let User = mongoose.model('User', UserSchema);

module.exports = User;

