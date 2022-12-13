import React, { useState, useEffect } from "react";
// import Button from "./Button.js";
import "./index.css"; 
import Rating from "./rate";
import NavBar from "./NavBar";
import Profile from "./Profile";
import CreateNewHabit from "./CreateNewHabit";
import Homepage from "./Homepage";



const { users } = require('./backend/users.json');
// const { }
// console.log(userId);

const userDB = require('./backend/DB.json');
var ReactDOM = require('react-dom/client');
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
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   fetch("http://localhost:3001/login")
  //   .then(res => res.json())
  //   .then(d => {setUserId(d)});
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3001/login", {
      'credentials':'include',
      'method':'GET',
      'mode':'cors'
    })
      .then(res => res.json())
      .then(d => {
        if(!d.loggedIn){
          console.log("d: ", d);
          console.log("not logged In");
          setLoggedIn(false);
          // return (<Homepage />);
          //redirect to Homepage for login/register
        }else{
          console.log("logged in")
          setLoggedIn(true);
        }
      });
    }, []);

  const habitDB = [
    [100, "Jog everyday", "Daily junk food"],
    [101, "50 pushups daily", "idling away time"],
    [102, "3 miles running", "improve cardio endurance"]
    ];
    habitDB.push([0, "Profile"]);
  
    const habitDBJson = {
      habitId100 : {
          streak: 0,
          days: 5
      },
      habitId0: {
        streak:0,
        days:0
      }
    };
    let i = 101;
    habitDBJson["habitId"+ i++]  = {streak: 0, days: 5};
    habitDBJson["habitId"+ i++]  = {streak: 0, days: 5};
  
  let urlParams = new URLSearchParams(document.URL.toString().split("?")[1]);
  const habitInx = habitDB.findIndex(x => x[0] === parseInt(urlParams.get("habit_id")));
  const currHabit1 = habitInx === -1 ? habitDB[0] : habitDB[habitInx];
  
  const cnHabit = urlParams.get("makeHabit");


  const [currHabit, setCurrHabit] = useState(currHabit1);
  const [count, setCount] = useState(0); //Streak count 
  var [highestCount, setHighestCount] = useState(0);
  const [days, setDays] = useState(habitDBJson["habitId"+currHabit[0]].days);
  const [initDays] = useState(days);
  var [progress, setProgress] = useState(0); //Sets progress equal to INITIAL value of days
  // var [goalMet, setGoalMet] = useState(0); 
  var [logged, setLogged] = useState(0);
  const [newHabit, setNewHabit] = useState(cnHabit === null ? null : cnHabit); //var used to check if createNewHabit button is already clicked

  window.onkeydown = (e) => {
    // console.log(e.key);
    if(e.key === "Enter"){
        // console.log(ina.value);
        createHabit(document.querySelector("#new-in-val").value);
    }
  }
  function createHabit(makeHabit){
    console.log(makeHabit+" is entered")
    document.location.href = "http://"+document.location.host + "/create?makeHabit=" + makeHabit;
  }
  function Log() {
    setCount(count + 1);  
    setLogged(1); 
    
    if (progress < initDays ) {
      setProgress(progress + 1);
    } 

    CheckGoal(0);
    }   

  function logCheck() { 
    if (logged === 0 && days !== 0) {
      return (<button className = "btn btn-success mx-3"
            onClick={() => Log() }
            > Log </button>);
    } else {
      return(<p></p>);
    }
    
  }

  function passDay() {
    if (days > 0 ) {
      setDays(days - 1);
    } 

    if (logged === 0) {
      setCount(0);
    }  

    setLogged(0);
  }

  function Reset() {
    setCount(0);  
    setDays(initDays); 
    setProgress(0); 
    CheckGoal(); 
    setLogged(0); 
    setHighestCount(0);
  } 

  function CheckGoal() { 

    if (days === 0) {
      if (progress === initDays) {
        // setGoalMet(true);
        return <p className="text-success"> Met </p>;
      } 
  
      else {
        // setGoalMet(false); 
        return <p className="text-danger"> Not Met </p>;
      }
    } 

    else {
      return <p className="text-primary"> In Progress </p>;
    }
  } 

  function CheckStreak() {
    if (count > highestCount) {
      setHighestCount(count);
    } 

    return highestCount;
  } 

  function calcKarma() {
    var score = 0; 

    score += (highestCount * 50); 
    score += ((progress / initDays)  * 100) * 3; 

    return score;
  } 

  function endStats() {
    if(days === 0) {
      return ( 
      <div>
        <h1> Highest Streak: {CheckStreak()} </h1>  
        <h1> Total Progress: {progress * 10}% </h1> 
        <h1> KARMA Earned: {calcKarma()} </h1> 
        <Rating/> 
      </div>
      );
    }
  }

  if(!loggedIn && !document.URL.includes("/login")){
    console.log(loggedIn, document.URL.includes("/login")); 
    document.location.href = 'http://localhost:3000/login';
  }
  if(loggedIn && document.URL.includes("/login")){
    document.location.href= "http://localhost:3000";
  }
  if(document.URL.includes("/login")){
    return <Homepage />;
  }
  if(newHabit !== null) return <CreateNewHabit makeHabit={newHabit} />;
  if(currHabit1[1].toLowerCase() === "profile") return <Profile />;
  return (
    <>
    {/* { newHabit !== false && <CreateNewHabit makeHabit={newHabit} />} */}
  <NavBar />
    <div id="main">
    <div className = "container">
    <div id="makeBreakBox">
            <h2> <strong className="text-success"> MAKE:</strong> {currHabit[1]} </h2> 
            <h2> <strong className="text-danger"> BREAK:</strong> {currHabit[2]} </h2>
    </div>
    <div className="card text-center my-5 border border-dark"> 

      <div className = "card-body row"> 
          
        <h1 className="pb-5 fw-bold">Habits Progress</h1>   
        {/* <h1>{logged}</h1>  */} 

        {/* Streak Display */}
        <div className="col"> 
            <h2 className = "my-5 fw-bold text-warning"> Streak  </h2>   
            <h2> x {count}</h2>
        </div>  

        {/* Days Display */}
        <div className="col"> 
            <h2 className = "my-5 fw-bold"> Days Left </h2>    
            <h2> {days} </h2>
        </div> 

        {/* Progress Display */}
        <div className="col"> 
            <h2 className = "my-5 fw-bold text-info"> Progress </h2>   
            <h2> { Math.ceil((progress / initDays)  * 100)}% </h2> 
        </div>
      </div>
      {/* rating part of strak */} 

      <div className="p-3">
        {/* Increase Count */} 
            {/* Possibly change functionality, so that logging can only be done ONCE per day */}
            {logCheck()}  

            {/* Decrease Day */}
            <button className = "btn btn-primary mx-3"
            onClick={() => passDay() }
            > Pass Day </button>
            
            {/* Reset Count (for testing purposes) */}
            <button className = "btn btn-danger mx-3"
            onClick={() => Reset() }> Reset </button>
      </div>
      
    </div>

      
    <div className="card text-center my-5"> 
      <div className = "card-body row border border-dark"> 
        <h1 className="pb-5 fw-bold">Goal Status</h1>  
        <h2 className="fw-bold"> {CheckGoal()} </h2> 
     
        <div>
            {endStats()}
         </div> 
      </div>
    </div>


  </div>
  </div>

  </>); //End of return
}

export default App;

