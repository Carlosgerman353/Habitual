import React, { useState } from "react";
import "./index.css"; 
  
  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("mySidenav").style.color = "#818181 !important";
    document.getElementById("main").style.marginLeft = "250px";
  }
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("mySidenav").style.color = "rgba(0,0,0,0) !important";
    document.getElementById("mySidenav").style.width = "0";
  } 

export default function NavBar(props) {
    return (
        <>
        <div id="mySidenav" className="sidenav">
            <button className="closebtn" onClick={() => closeNav()}>&times;</button>
            <a href="#" className="active currHabit">Jog everyday</a>
            <a href="#">50 pushups daily</a>
            <a href="#">3 miles running</a>
        </div>
        <div id="hamburger-expand-btn" onClick={() => openNav()}><svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"/></svg></div>
        </>
        )
  }