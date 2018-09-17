import React from "react";
import "./List.css";

export const PhotoList = ({ children }) => {
  	return (
    	<ul className='gallery-list'>
      		{children}
      	</ul>
  	);
};