import React from "react";

export const ListItem = props => (
  <li>
  	{props.title} - {props.takenBy}<br></br>
    {props.children}
  </li>
);