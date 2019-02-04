function usersOnly(req, res, next){
	if(!req.session.user){
		res.status(401).json({"error":"please log in"});
	}
	else{
		next();
	}
}

function adminsOnly(req, res, next){
	if(!req.session.user.isAdmin){
		res.status(403).json({"error":"you are not an admin"})
	}
	next();
}

module.exports ={
	usersOnly,
	adminsOnly
}