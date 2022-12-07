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
  var [goalMet] = useState(0); 
  var [logged, setLogged] = useState(0);

  function Log() {
    setCount(count + 1);  
    setLogged(1); 
    
    if (progress < initDays ) {
      setProgress(progress + 1);
    } 

    CheckGoal();
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
        goalMet = true; 
        return <p className="text-success"> Met </p>;
      } 
  
      else {
        goalMet = false; 
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
  
  return (<div className = "container">
    <div className="card text-center my-5"> 
      <div className = "card-body row"> 
        
        <h1>Habits Progress</h1>   
        <h1>{logged}</h1> 

        <h2> <strong className="text-success"> MAKE:</strong> Jog <em> every Day </em> </h2> 
        <h2> <strong className="text-danger"> BREAK:</strong> Eating Junk Food <em> every Day </em> </h2>

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

      

  </div>);
    </div> 
    
    <div className="card text-center my-5"> 
      <div className = "card-body row"> 
        <h1>Goal Status</h1>  
        <h2> {CheckGoal()} </h2> 
         {/*Only show this once goal is complete */}  
     
         <h1> Highest Streak: {CheckStreak()} </h1>  
         <h1> Total Progress: {progress} </h1>
         <h1> KARMA Earned: {calcKarma()} </h1>
      </div>
    </div>


  </div>); //End of return
}

export default App;

// export default function App() {
//   const [count, setCount] = useState(0);

//   let incrementCount = () => {
//     setCount(count + 1);
//   };

//   let decrementCount = () => {
//     setCount(count - 1);
//   };

//   return (
//     <div className="app">
//       <div>
//         <div class="count">
//           <h3>Count:</h3>
//           <h1>{count}</h1>
//         </div>
//         <div class="buttons">
//           <Button title={"-"} action={decrementCount} />
//           <Button title={"+"} action={incrementCount} />
//         </div>
//       </div>
//     </div>
//   );
// }