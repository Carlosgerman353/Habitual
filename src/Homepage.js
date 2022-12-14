import React, {useEffect, useState} from "react";

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
    return (
        <>
        <div id="main">
            <div id="container" className="container text-center">
            <h3>Login</h3>
            Username: <input name="username" id="username" onChange={handleChange} /> <br /><br />
            Pass: <input type="password" name="password" id="password"  onChange={handleChange} /> <br /><br />
            <button onClick={handleSubmit}>Log in</button>
            </div>
            </div>
        </>
    )
}