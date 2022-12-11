import React, {useState} from "react";
import NavBar from "./NavBar";

export default function CreateNewHabit(props){
    return (
        <>
        <NavBar />
        <div id="main">
            <div id="container">
                <h1>Make Habit: {props.makeHabit}</h1>
            </div>  
        </div>
        </>
    )
}