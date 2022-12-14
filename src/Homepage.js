import React, {useEffect, useState} from "react";

const favicon = require('./favicon.png');
function handleSubmit2(d){
    sessionStorage.setItem('userDB', JSON.stringify(d));
    document.location.href = "http://localhost:3000";
}
   function Login(username, password){
            fetch(`http://localhost:3001/login`, {
                "credentials": "include",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "referrer": "http://localhost:3000/",
                "body": `username=${username}&password=${password}`,
                "method": "POST",
                "mode": "cors"
                })
                .then(res => {
                    if(res === undefined || res === null) alert("Wrong username/password combination")
                    return res.json();
                })
                .then(d => {
                    if(d === undefined || d === null) alert("Wrong username/password combination")
                    if(d.message !== null && d.message !== undefined) alert(d.message);
                    console.log(d);
                    handleSubmit2(d);
                });
    }
export default function Homepage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

 

    function handleChange(event) {
        setPassword(document.querySelector("#password").value);
        setUsername(document.querySelector("#username").value);
      }
    function handleSubmit(event){
        console.log("handleSubmit",username,password)
        Login(username, password);
    }
    window.onload = () => {
        let i = 1;
        document.querySelectorAll("#downArr").forEach(x => {
            x.style.animationName = `spin`;
            x.style.animationDelay = `${i}s`;
            x.style.animationDuration =`${1}s`;
            x.style.animationFillMode= `forwards`;
            i += 0.2;
        });
        
        let x = document.querySelector("#logo");
        x.style.animationName = `spin`;
            x.style.animationDelay = `${i}s`;
            x.style.animationDuration =`${1}s`;
            x.style.animationFillMode= `forwards`;

        bgLogo();
        setInterval(() => {bgLogo()}, 1000);
        function bgLogo(){
            let bgc = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
           document.querySelector("#logo").style.backgroundColor =  bgc;
           document.querySelector("#logo").style.boxShadow = `5px 5px 3em ${bgc}`;
        }

    }
    return (
        
        <>
        <div id="main" className="container card text-center">
    <div id="login">
		<div id="homepage">
			<div id="about">
				<h3><u>HABITU-ALL</u></h3>
			<div id="features-text">
                <img id="logo" src={favicon} height={120} width={120} /><br /><br />
            </div>
			<ul id="features">
				<li>Create Habits</li>
			<svg id="downArr" width="512px" height="512px" viewBox="0 0 512 512" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M256,478,80,302l21.2-21.21L241,420.6V34h30V420.6L410.84,280.75,432,302Z"></path></svg>

				<li>Track Habits online</li>
				<svg id="downArr" width="512px" height="512px" viewBox="0 0 512 512" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M256,478,80,302l21.2-21.21L241,420.6V34h30V420.6L410.84,280.75,432,302Z"></path></svg>
				<li>Share progress with friends</li>
			</ul>
			</div>

		</div>
            <div id="container" className="container text-center">
            <h3>login</h3>
            Username: <input name="username" id="username" onChange={handleChange} /> <br /><br />
            Password: <input type="password" name="password" id="password"  onChange={handleChange} /> <br /><br />
            <button onClick={handleSubmit} className="btn btn-success">Log in</button>
            </div>
            </div>
            </div>
        </>
    )
}