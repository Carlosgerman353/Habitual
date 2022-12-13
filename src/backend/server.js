const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const crypto = require("crypto");
const userDB = require('./DB.json');
const port = process.env.PORT || 3001;

const {users} = require('./users.json');
// const truePass =  password;
// console.log(truePass)
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
app.use(
	cors({
	  origin: ["http://localhost:3000"],
	  methods: ["GET", "POST"],
	  credentials: true,
	})
  );
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
	  key: "userId",
	  secret: crypto.randomBytes(20).toString("hex"),
	  resave: false,
	  saveUninitialized: false,
	  cookie: {
		expires: 60 * 1000 * 1/60 * 5 // one day expiry date
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
	var hash = crypto.createHash('sha256');
	const {username, password} = req.body;
	passHash = hash.update(password).digest('hex');
	// console.log(passHash);
	console.log("username",username, users[username] !== undefined);
	console.log("passHash\n",passHash,"\n", users[username].password);
	let response = (users[username] !== undefined) && (passHash === users[username].password);
	console.log("response",response);
	if (response) {
		req.session.user = users[username].userId;
		console.log(req.session.user);
		// res.send(userDB[req.session.user])
		res.redirect("http://localhost:3000/");
		// res.redirect("http://localhost:3000/");
	} else {
		res.send({ message: "Wrong username/password combination!" });
	}
});

