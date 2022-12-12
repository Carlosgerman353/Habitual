import React, { useState } from "react";
import "./index.css"; 
import createHabit from "./App";

const habitDB = [
    [100, "Jog everyday", "Daily junk food"],
    [101, "50 pushups daily", "idling away time"],
    [102, "3 miles running", "improve cardio endurance"]
    ];

  habitDB.push([0, "Profile"]);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.width = "0";
} 

let urlParams = new URLSearchParams(document.URL.toString().split("?")[1]);
const habitInx = habitDB.findIndex(x => x[0] === parseInt(urlParams.get("habit_id")));

const currHabit1 = (habitInx === -1 ) ? habitDB[0] : habitDB[habitInx]; //stores whatever page we currently on

// setNavLinks();
export default function NavBar(props) {
const [navLinks, setNavLinks] = useState(habitDB);
const [currHabit, setCurrHabit] = useState(currHabit1);

function addNewTask(){
    let ina = document.createElement("input");
    ina.id = "new-in-val";
    ina.placeholder = "new name here";
    document.querySelector("#navHabitList").insertBefore(ina, document.querySelector("#navHabitList").children[document.querySelector("#navHabitList").childElementCount - 1]);
}
    return (
        <>
        <div id="mySidenav" className="sidenav">
            <button className="addBtn" onClick={() => addNewTask()}>+</button>
            <button className="closebtn" onClick={() => closeNav()}>&times;</button>
            <div id="navHabitList">
                {
                    navLinks.map(h => (
                        //if not current habit then class=inactive else class="active currHabit"
                        <a key={h[0]} className={(h[0] !== currHabit[0] /*&& h[0] !== 0*/) ? "inactive" : "active currHabit"} href={h[0] !== 22 ? "habit?habit_id="+h[0] : "/profile"}>{h[1]}</a> //if 22 is set to 0 then the href for profile will be /profile
                        )
                    )
                }
            </div>
        </div>
        <div id="hamburger-expand-btn" onClick={() => openNav()}>
            <svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"/></svg>
        </div>
        </>
        )
  }