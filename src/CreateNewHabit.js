import React, {useState} from "react";
import NavBar from "./NavBar";

export default function CreateNewHabit(props){
    return (
        <>
        <NavBar />
        <div id="main">
            <div id="container">
                <form onsubmit="createNewHabit" id="createForm">
                    <h1>Make Habit: <input name="makeHabit" value={props.makeHabit}></input></h1>
                    <h1>Break Habit: <input name="breakHabit"></input></h1>
                    
                </form>
            </div>  
        </div>
        </>
    )
}