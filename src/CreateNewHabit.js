import React, {useState} from "react";
import NavBar from "./NavBar";


export default function CreateNewHabit(props){
    const [mh, setMh] = useState(props.makeHabit);
    const [bh, setBh] = useState("");
    const [fdd, setFdd] = useState("");
 
    function handleChange(event) {
        setBh(document.querySelector("#fbh").value);
        setMh(document.querySelector("#fmh").value);
        setFdd(document.querySelector("#fdd").value);
      }
    function handleSubmit(event){
        console.log(mh, bh, fdd);
        
        //make request to DB/backend and refresh
        event.preventDefault();
    }
    return (
        <>
        <NavBar />
        <div id="main">
            <div id="container" className="text-center">
                <form onSubmit={handleSubmit} id="createForm">
                    <h1><strong>Create a New Habit</strong></h1><br />
                    <h3>Make Habit: <input id="fmh" name="makeHabit" value={props.makeHabit} onChange={handleChange}></input></h3>
                    <h3>Break Habit: <input id="fbh" name="breakHabit" onChange={handleChange}></input></h3>
                    <h3>Get done by: <input id="fdd" name="dueDate" type="date" onChange={handleChange}></input></h3>
                    {/* { (document.querySelector("#fmh").value.length > 0) && (document.querySelector("#fbh").value.length > 0) && (document.querySelector("#fdd").value.length > 0) && ( */}
                    { 2==2 && <button className="btn btn-success"> SAVE </button>}
                    {/* )} */}

                </form>
            </div>  
        </div>
        </>
    )
}