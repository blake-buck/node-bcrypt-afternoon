require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {json} = require('body-parser');

const ac = require('./controllers/authController.js');
const {dragonTreasure, getUserTreasure, addUserTreasure, getAllTreasure} = require('./controllers/treasureController.js');
const auth = require('./middleware/authMiddleware.js');


app = express();

app.use(json());

massive(process.env.CONNECTION_STRING).then( (dbInstance) => {
	app.set('db', dbInstance);
}).catch(err => console.log(err))

app.use(session({
	secret:process.env.SESSION_SECRET,
	resave:true,
	saveUninitialized:false
}))

app.get('/auth/logout', ac.logout);

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);


app.get('/api/treasure/dragon', dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, getUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, getAllTreasure);

app.post('/api/treasure/user', auth.usersOnly, addUserTreasure);

app.listen(5050, ()=>{console.log("listening on 5050")});