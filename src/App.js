import React, { useState } from "react";
// import Button from "./Button.js";
import "./index.css"; 
import Rating from "./rate";


function App() {


  const [count, setCount] = useState(0); 
  const [days, setDays] = useState(10); 
  var [progress, setProgress] = useState(days); //Sets progress equal to INITIAL value of days
  return (<div className = "container">
    <div className="card text-center my-5"> 
      <div className = "card-body row"> 
        
        <h1>Habits Page</h1>  

        {/* Try to change progress and day data with JSX. Ideally, each var should be independent */}  
        {/* Implement a "next day" button to simulate time passage and potentially break streaks */}
        {/* Add condition to prevent Days from dropping below 0. */}

        {/* Streak Display */}
        <div className="col"> 
            <h2 className = "my-5"> Streak x {count} </h2>  
            
            {/* Increase Count */}
            <button className = "btn btn-success mx-3"
            onClick={() => setCount(count + 1)}
            > Log </button> 
            
            {/* Reset Count (for testing purposes) */}
            <button className = "btn btn-danger mx-3"
            onClick={() => setCount(0)}> Reset </button>
        </div>  

        {/* Days Display */}
        <div className="col"> 
            <h2 className = "my-5"> Days Left x {days - count} </h2>   
        </div> 

        {/* Progress Display */}
        <div className="col"> 
            <h2 className = "my-5"> Progress: {( (progress - (days - count)) / progress )  * 100}% </h2>   
        </div>
      </div>
      {/* rating part of strak */}
      <Rating/>
    </div>

      

  </div>);
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