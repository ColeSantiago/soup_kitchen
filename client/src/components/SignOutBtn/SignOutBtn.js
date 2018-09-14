import React from "react";
import './SignOutBtn.css';

const SignOutBtn = props => (
	<button className='sign-out-btn' onClick={props.onClick} {...props}> Log Out</button>
);

export default SignOutBtn;