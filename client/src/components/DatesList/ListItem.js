import React from "react";
// import "./List.css";
import { Link } from "react-router-dom";

export const ListItem = props => (
  <li>
  	<Link className="date-item" to={`/jobsignup/date/${props.id}`}>{props.title}</Link> <br></br>
    {props.children}
  </li>
);