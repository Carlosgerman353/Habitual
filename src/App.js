import React, { useState } from "react";
// import Button from "./Button.js";
import "./index.css"; 
import Rating from "./rate";


function App() {


  const [count, setCount] = useState(0); //Streak count 
  var [highestCount, setHighestCount] = useState(0);
  const [days, setDays] = useState(10);   
  const [initDays] = useState(days);
  var [progress, setProgress] = useState(0); //Sets progress equal to INITIAL value of days   
  // var [goalMet, setGoalMet] = useState(0); 
  var [logged, setLogged] = useState(0);

  function Log() {
    setCount(count + 1);  
    setLogged(1); 
    
    if (progress < initDays ) {
      setProgress(progress + 1);
    } 

    CheckGoal(0);
  }   


  async function getMakeHabit(habit_id){
    let url = `localhost:3001/habit_info?id=${habit_id}`;
    // useEffect(() => {
      let res = await fetch(url)
      let data = await res.json();
      return data.makeHabit;
    // }, []);
  }
  
  async function getBreakHabit(habit_id){
    let url = `localhost:3001/habit_info?id=${habit_id}`;
    // useEffect(() => {
      let res = await fetch(url)
      let data = await res.json();
      return data.breakHabit;
    // }, []);
  }
  function getHabitMake(id=0){ //we want this function to fetch from DB and return makeHabit data
    return "Jog Every Day";
    //remove after we use the db based functions
  }
  function getHabitBreak(id=0){ //we want this function to fetch from DB and return breakHabit data
    return "Eating junk food everyday";
   //remove after we use the db based functions
  }
  function logCheck() { 
    if (logged === 0 && days !== 0) {
      return (<button className = "btn btn-success mx-3"
            onClick={() => Log() }
            > Log </button>);
    } 

    else {
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
        <h1> Total Progress: {progress} </h1>
        <h1> KARMA Earned: {calcKarma()} </h1>
      </div>
      );
    }
  }
  
  return (
    <div className = "container">
    <div className="card text-center my-5"> 
      <div className = "card-body row"> 
        
        <h1>Habits Progress</h1>   
        <h1>{logged}</h1> 

        <h2> <strong className="text-success"> MAKE:</strong> {getHabitMake(0)} </h2> 
        <h2> <strong className="text-danger"> BREAK:</strong> {getHabitBreak(0)} </h2>

        {/* Streak Display */}
        <div className="col"> 
            <h2 className = "my-5"> Streak x {count} </h2>  
            
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

        {/* Days Display */}
        <div className="col"> 
            <h2 className = "my-5"> Days Left x {days} </h2>   
        </div> 

        {/* Progress Display */}
        <div className="col"> 
            <h2 className = "my-5"> Progress: { (progress / initDays)  * 100}% </h2>   
        </div>
      </div>
      {/* rating part of strak */}
      <Rating/>
    </div>

      
    <div className="card text-center my-5"> 
      <div className = "card-body row"> 
        <h1>Goal Status</h1>  
        <h2> {CheckGoal()} </h2> 
     
        <div>
            {endStats()}
         </div> 
      </div>
    </div>


  </div>); //End of return
}

export default App;

