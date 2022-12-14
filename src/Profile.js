import React, { useState } from "react";
import "./index.css"; 
import NavBar from "./NavBar";


// const userDB = {
//     userId: 1,
//     name: "John Cena",
//     motto: "You can't see me",
//     imgSrc: "https://images.genius.com/b7856ba4b9670f426d8b347b3fc20a52.403x363x1.png"
// };

// const userHabitsStats = [
//     {
//         habitId:100,
//         makeHabit: "Jog Daily",
//         progress: 50,
//         days: 5
//     },
//     {
//         habitId: 101,
//         makeHabit: "50 pushups daily",
//         progress: 60,
//         days: 10
//     }
// ];





// console.log(JSON.stringify(userHabitsStats))
export default function Profile (props) {
    const userDB = JSON.parse(sessionStorage.getItem('userDB'));
    const userHabitsStats = userDB.habits;
    for(let it=0;it<userHabitsStats.length-2;it++){
        let hb = [];
        for(let i in userHabitsStats[it]){
            hb[it] = i;
        }
        userHabitsStats[it][hb[it]].habitId = parseInt(hb[it].split("Id")[1])
        userHabitsStats[it] = userHabitsStats[it][hb[it]];
    }
    const [currUser, setcurrUser] = useState(userDB);
    const [userStats, setUserStats] = useState(userHabitsStats.filter(y => y.makeHabit !== undefined));
    console.log(userHabitsStats, userStats)
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
                                <li key={x.habitId}>
                                    <div id="mkHb"> {x.makeHabit}</div>
                                    <span id="progress">Progress: <b>{x.progress}%</b></span>
                                    <span id="daysLeft">Days Remaining: <b>{x.days}</b></span>
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