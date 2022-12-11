import React, { useState } from "react";
import "./index.css"; 
import NavBar from "./NavBar";


const userDB = {
    name: "John Cena",
    motto: "You can't see me",
    imgSrc: "https://images.genius.com/b7856ba4b9670f426d8b347b3fc20a52.403x363x1.png"
};
const userHabitsStats = [
    {
        habit_id:100,
        makeHabit: "Jog Daily",
        progress: 50,
        daysRemaining: 5
    },
    {
        habit_id: 101,
        makeHabit: "50 pushups daily",
        progress: 60,
        daysRemaining: 10
    }
];

export default function Profile (props) {
    const [currUser, setcurrUser] = useState(userDB);
    const [userStats, setUserStats] = useState(userHabitsStats);
    return (
        <>
        <NavBar />
        <div id="main">
            <div className="container">
                <div id="about-box">
                    <img src={currUser.imgSrc} width="200" height="200"/>
                    <h1><strong>Name: </strong>{currUser.name}</h1>
                    <h1><strong>Motto:</strong> {currUser.motto}</h1>
                </div>
                <br />
                <h3><b>Current stats</b></h3>
                <div id="allHabits">
                    <ul id="allList">
                        {
                            userStats.map(x => (
                                <li key={x.habit_id}>
                                    <div id="mkHb"> {x.makeHabit}</div>
                                    <span id="progress">Progress: <b>{x.progress}%</b></span>
                                    <span id="daysLeft">Days Remaining: <b>{x.daysRemaining}</b></span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
  }