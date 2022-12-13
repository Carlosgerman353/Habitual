import React from "react";

export default function Homepage(){
    return (
        <>
        <form name="login" method="POST" action="http://localhost:3001/login">
            Username: <input name="username" /> <br />
            Pass: <input type="password" name="password" /> <br />
            <button>Log in</button>
        </form>
        </>
    )
}