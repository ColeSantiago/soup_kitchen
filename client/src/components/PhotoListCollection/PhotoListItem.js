import React from "react";
import "./List.css";

export const PhotoListItem = props => (
  <li>
	   <img onClick={props.onClick} className="gallery-photo" src={props.url} alt={props.id} /> <br></br>
	   {props.children}
  </li>
);


