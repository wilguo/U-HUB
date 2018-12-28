/* Users model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	schoolName: {
		type: String,
		required: true,
	},
	yearOfStudy: {
		type: Number,
		required: true,
	},
	programOfStudy: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	topics: [String],
	goingToEvents: [mongoose.Schema.Types.ObjectId],
	posts: [String]
})

UserSchema.statics.findByUsernamePassword = async function(username, password) {
	const User = this

	const user = (await User.findOne({username: username})).toObject();
	if(!user) {
		throw new Error('User doesn\'t exist');
	}
	const result = await bcrypt.compare(password, user.password);

	if(!result) {
		throw new Error('Incorrect Password');
	}

	return user;
}

UserSchema.pre('save', async function(next) {
	const user = this
	try {
		if(user.isModified('password')) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);

			user.password = hash;
		}

		next();
	} catch(e) {
		next(e);
	}
})


const User = mongoose.model('User', UserSchema)

module.exports = { User }
