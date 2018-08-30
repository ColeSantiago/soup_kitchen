import React from "react";
// import "./List.css";
// import { Link } from "react-router-dom";

export const ListItem = props => (
  <li>
  	{props.title}<br></br>
    {props.children}
  </li>
);