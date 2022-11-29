import React, { useState } from "react";
// import Button from "./Button.js";
import "./index.css"; 


function App() {


  const [count, setCount] = useState(0);
  return (<div className = "container">
    <div className="card text-center my-5"> 
      <div className = "card-body"> 
        <h1>Habits Page</h1> 
        <div className="my-5"> 
            <h2 className = "my-5"> Streak x {count} </h2>  
            <button className = "btn btn-success mx-3"
            onClick={() => setCount(count + 1)}
            > Log </button> 
            <button className = "btn btn-danger mx-3"
            onClick={() => setCount(0)}> Reset </button>
        </div>
      </div>
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