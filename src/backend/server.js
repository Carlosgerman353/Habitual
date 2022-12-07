const express = require('express');//();
const app = express();
const pgp = require("pg-promise")(); //not installed the package yet. so will show error right now

const port = process.env.PORT || 3001;

//from postgres; here from herokuapp
const connString = {
	host: "ec2-3-211-6-217.compute-1.amazonaws.com",
	user: "hwahduilaneiyg",
	port: 5432,
	password: "",
	database: "d7ppu3t1a25pjf",
	ssl: { rejectUnauthorized: false }
};

let db = pgp(connString);

app.get("/habit_info", (req, res) => {
	let habit_id = req.query.id;
	const habit_info = {};

	db.any(`SELECT makeHabit FROM habit WHERE habitId = ${habit_id};`)
	.then(rows => {
		habit_info.makeHabit = rows;
	}).catch(e => { console.log(e); });

	db.any(`SELECT breakHabit FROM habit WHERE habitId = ${habit_id};`)
	.then(rows => {
		habit_info.breakHabit = rows;
	}).catch(e => { console.log(e); });
	
	res.json(habit_info);
	});


app.listen(port, process.env.IP, () => {
	console.log("Listening on port " + port);
});d 