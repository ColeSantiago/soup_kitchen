import React from "react";
// import RaisedButton from 'material-ui/RaisedButton';

const SignOutBtn = props => (
	<button onClick={props.onClick} {...props}> Log Out</button>
);

export default SignOutBtn;