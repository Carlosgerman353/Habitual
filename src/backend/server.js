const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const crypto = require("crypto");
var hash = crypto.createHash('sha256');

const port = process.env.PORT || 3001;

const truePass =  crypto.createHash('sha256').update('root').digest('hex');
console.log(truePass)
// const pgp = require("pg-promise")(); //not installed the package yet. so will show error right now


// //from postgres; here from herokuapp
// const connString = {
// 	host: "ec2-3-211-6-217.compute-1.amazonaws.com",
// 	user: "hwahduilaneiyg",
// 	port: 5432,
// 	password: "",
// 	database: "d7ppu3t1a25pjf",
// 	ssl: { rejectUnauthorized: false }
// };

// let db = pgp(connString);


// app.get("/habit_info", (req, res) => {
// 	let habit_id = req.query.id;
// 	const habit_info = {};

// 	db.any(`SELECT makeHabit FROM habit WHERE habitId = ${habit_id};`)
// 	.then(rows => {
// 		habit_info.makeHabit = rows;
// 	}).catch(e => { console.log(e); });

// 	db.any(`SELECT breakHabit FROM habit WHERE habitId = ${habit_id};`)
// 	.then(rows => {
// 		habit_info.breakHabit = rows;
// 	}).catch(e => { console.log(e); });
	
// 	res.json(habit_info);
// 	});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
	  key: "userId",
	  secret: crypto.randomBytes(20).toString("hex"),
	  resave: false,
	  saveUninitialized: false,
	  cookie: {
		expires: 60 * 1 * 1000, // one day expiry date
	  },
	})
  );

app.listen(port, process.env.IP, () => {
	console.log("Listening on port " + port);
});
app.get("/login", (req, res) => {
	if (req.session.user) {
	  res.send({ loggedIn: true, user: req.session.user });
	} else {
	  res.send({ loggedIn: false });
	}
  });

app.post("/login", (req, res) => {
	console.log(req.body)
	const {username, password} = req.body;
	passHash = hash.update(password).digest('hex');
	console.log(passHash)
	let response = passHash == truePass;
	if (response) {
		req.session.user = username;
		console.log(req.session.user);
		res.send(username);
	} else {
		res.send({ message: "Wrong username/password combination!" });
	}
});

