import React from "react";
import "./List.css";
import { Link } from "react-router-dom";

export const ListItem = props => (
  <li className="date-item-li">
  	<Link className="date-item-a" to={`/jobsignup/date/${props.id}`}>{props.title}</Link>
    {props.children}
  </li>
);