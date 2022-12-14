import React, { useState, useEffect } from "react";
// import Button from "./Button.js";
import "./index.css"; 
import Homepage from "./Homepage";
import Habitpage from "./Habitpage";
import CreateNewHabit from "./CreateNewHabit";


const { users } = require('./backend/users.json');
// const { }
// console.log(userId);
//[habit_id, makeHabit, breakHabit]

// users[userId].habits.forEac
// fetch("http://localhost:3001/login")
//   .then(res => res.json())
//   .then(d => {
//     if(!d.loggedIn){
//       console.log("not logged In");
//       //redirect to Homepage for login/register
//     } 
//   });

function App() {
  
  let urlParams = new URLSearchParams(document.URL.toString().split("?")[1]);
  const cnHabit = urlParams.get("makeHabit");
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('userDB') !== null && sessionStorage.getItem('userDB').includes("makeHabit"));
  const [newHabit, setNewHabit] = useState(cnHabit === null ? null : cnHabit); //var used to check if createNewHabit button is already clicked
 
  if(!loggedIn && !document.URL.includes("/login")){
    console.log(loggedIn, document.URL.includes("/login")); 
    document.location.href = 'http://localhost:3000/login';
  }
  if(loggedIn && document.URL.includes("/login")){
    document.location.href= "http://localhost:3000/habit?habitId=1";
  }
  if(loggedIn && (!document.URL.includes("/habit") && !document.URL.includes("/create"))){
    document.location.href= "http://localhost:3000/habit?habitId=1"; 
  }
  if(document.URL.includes("/login")){
    return <Homepage />;
  }
  if(loggedIn && document.URL.includes("/habit")){
    return <Habitpage />
  }
  if(newHabit !== null) return <CreateNewHabit makeHabit={newHabit} />;
}

export default App;

