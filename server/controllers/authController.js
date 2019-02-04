const bcrypt = require('bcryptjs');

function register(req, res){
	const db = req.app.get('db');
	const {username, password, isAdmin} = req.body;
	
	db.get_user(username).then( (results) => {
		console.log(results);
		if(results[0]){
			res.status(409).json({error:"username taken"});
		}
		else{
			console.log("firing");
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);
			
			db.register_user(isAdmin, username, hash).then( (results2) => {
				var newUser = results2[0]
				req.session.user = {isAdmin: newUser.isAdmin, username:newUser.username, id:newUser.id};
				res.json(req.session.user);
			}).catch( (err) => console.log(err));
		}
		
	}).catch( (err) => console.log(err));
}

function login(req, res){
	const db = req.app.get('db');
	const {username, password} = req.body;
	
	db.get_user(username).then( (results) => {
		if(results[0]){
			const foundUser = results[0];
			const isAuthenticated = bcrypt.compareSync(password, foundUser.hash);
			if(isAuthenticated){
				req.session.user = {isAdmin:foundUser.is_admin, username:foundUser.username, id:foundUser.id};
				res.status(200).json(req.session.user);
			}
			else{
				res.status(403).json({"error":"Incorrect password"});
			}
		}
		else {
			res.status(401).json({"error":"user not found"});
		}
	}).catch( (err) => console.log("error at login",err));
	
}

function logout(req, res){
	req.session.destroy();
	res.status(200).json();
}

module.exports ={
	register, 
	login,
	logout
}