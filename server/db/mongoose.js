const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://team23:team23@eventsite-4mww5.mongodb.net/test?retryWrites=true'

mongoose.connect(mongoURI, { useNewUrlParser: true });

module.exports = mongoose