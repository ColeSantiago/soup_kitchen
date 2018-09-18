import React from "react";

export const PhotoListItem = props => (
  <li>
	   <img onClick={props.onClick} className="gallery-photo" src={props.url} alt={props.id} /> <br></br>
	   {props.children}
  </li>
);


