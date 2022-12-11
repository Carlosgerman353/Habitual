import React, { useState } from "react";
import "./index.css"; 
  

  const habitDB = [
  [100, "Jog everyday"],
  [101, "50 pushups daily"],
  [102, "3 miles running"]
  ];

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("mySidenav").style.color = "#818181 !important";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("mySidenav").style.color = "rgba(0,0,0,0) !important";
    document.getElementById("mySidenav").style.width = "0";
} 
// function setNavLinks(){
// let a = 0;
// let navLinks1 = []; 
// habitTitle.forEach(x => {
//         navLinks1.push(<a href={"habit?habit_id="+habitDB[a++]}>{x}</a>); 
// });
// navLinks1.forEach(x => console.log(x));
// }
const currHabit1 = [100, "Jog daily"];

// setNavLinks();
export default function NavBar(props) {

const [navLinks, setNavLinks] = useState(habitDB);
const [currHabit, setCurrHabit] = useState(currHabit1);
    return (
        <>
        <div id="mySidenav" className="sidenav">
            <button className="closebtn" onClick={() => closeNav()}>&times;</button>
            <div id="navHabitList">
                {
                    navLinks.map(h => (
                        <a key={h[0]} className={h[0] !== currHabit[0] ? "inactive":"active currHabit"} href={"habit?habit_id="+h[0]}>{h[1]}</a>
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