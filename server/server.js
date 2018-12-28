const port = process.env.PORT || 3030;

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const fileUpload = require('express-fileupload')

const mongoose  = require('./db/mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload())
app.use(session({
	secret: 'team23-secretblablablawhatisthis',
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: 6000000,
		httpOnly: true
	}
}));

// Set up our routes.
// This is so we can split them up into different files, instead of one big one.
// Instead of app.get(...) or app.post(...) see that it's router.get(...)
app.use('/api', require('./api'));
if(process.env.PORT !== undefined) {
	app.get('*', (req,res) =>{
		res.sendFile(path.join(__dirname+'/public/index.html'));
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});
