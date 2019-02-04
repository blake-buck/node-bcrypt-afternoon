
function dragonTreasure(req, res){
	const db = req.app.get('db');
	
	db.get_dragon_treasure(1).then( (results) => {
		res.status(200).json(results);
	}).catch(err => console.log(err))
}

function getUserTreasure(req, res){
	const db = req.app.get('db');
	
	db.get_user_treasure(req.session.user.id).then( (results) => {
		res.status(200).json(results);
	}).catch(err => console.log(err))
}

function addUserTreasure(req, res){
	const db = req.app.get('db');
	const {treasureURL} = req.body;
	const {id} = req.session.user;
	
	db.add_user_treasure(treasureURL, id).then((results) => {
		res.status(200).json(results);
	}).catch(err => console.log(err))
}

function getAllTreasure(req, res){
	const db = req.app.get('db');
	db.get_all_treasure().then((results) => {
		res.status(200).json(results);
	}).catch(err => console.log(err))
}

module.exports = {
	dragonTreasure, 
	getUserTreasure,
	addUserTreasure,
	getAllTreasure
}