import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";

function PostToDB(userDB){
    userDB = JSON.parse(userDB);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("c", JSON.stringify(userDB));
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/createNewHabit", requestOptions)
      .then(response => response.json())
      .then(result => {
        sessionStorage.setItem('userDB', result);
        document.location.href= "http://"+document.location.host;
      })
      .catch(error => console.log('error', error));
}
export default function CreateNewHabit(props){
    const [mh, setMh] = useState(props.makeHabit);
    const [bh, setBh] = useState("");
    const [fdd, setFdd] = useState("");

    
    function makeDbRequest(mh, bh, fdd, currLatestId){
        const userDB = JSON.parse(sessionStorage.userDB);
        console.log("writing to backend with data: ", mh, bh, fdd, "...");
        // alert(Math.round((new Date(fdd).getTime() - new Date().getTime())/(1000 * 60 *60 * 24)) );
        let dr = (Math.round((new Date(fdd).getTime() - new Date().getTime())/(1000 * 60 *60 * 24)) );
        // alert("userDB.habits" + " habitId"+currLatestId);
        // console.log(JSON.stringify(userDB.habits[document.querySelector("#navHabitList").childElementCount - 3]["habitId"+currLatestId]));
        // let ii = [];
        let currInx = document.querySelector("#navHabitList").childElementCount - 3;

        userDB.habits.splice(currInx + 1, 0, {});
        userDB.habits[currInx + 1]["habitId"+(currLatestId+1)] = {
            "makeHabit": mh,
            "breakHabit": bh,
            "progress": 0,
            "streak": 0,
            "days": dr
        };
        console.log(JSON.stringify(userDB));
        // userDB.habits.splice(document.querySelector("#navHabitList").childElementCount - 3, 0, ii["habitId"+currLatestId+1]);
        PostToDB(JSON.stringify(userDB));
    }
    function handleChange(event) {
        setBh(document.querySelector("#fbh").value);
        setMh(document.querySelector("#fmh").value);
        setFdd(document.querySelector("#fdd").value);
      }
    function handleSubmit(event){
        let currLatestId = document.querySelector("#navHabitList").children[document.querySelector("#navHabitList").childElementCount - 3].href.split("id=")[1];
        //make request to DB/backend and refresh
        makeDbRequest(mh, bh, fdd, parseInt(currLatestId));
        //document.location.href = `http://${document.location.host}`;
        event.preventDefault();
    }
    return (
        <>
        <NavBar />
        <div id="main">
            <div id="container" className="text-center">
                <div id="createForm">
                    <h1><strong>Create a New Habit</strong></h1><br />
                    <h3>Make Habit: <input id="fmh" name="makeHabit" value={props.makeHabit} onChange={handleChange}></input></h3>
                    <h3>Break Habit: <input id="fbh" name="breakHabit" onChange={handleChange}></input></h3>
                    <h3>Get done by: <input id="fdd" name="dueDate" type="date" onChange={handleChange}></input></h3>
                    {/* { (document.querySelector("#fmh").value.length > 0) && (document.querySelector("#fbh").value.length > 0) && (document.querySelector("#fdd").value.length > 0) && ( */}
                    { 2==2 && <button className="btn btn-success" onClick={handleSubmit}> SAVE </button>}
                    {/* )} */}

                </div>
            </div>  
        </div>
        </>
    )
}