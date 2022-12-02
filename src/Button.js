import React, { useState } from "react";
// import Button from "./Button.js";
import "./index.css"; 

export default function Button(props) {
    let { action, title } = props;
    return <button onClick={action}>{title}</button>;
  }