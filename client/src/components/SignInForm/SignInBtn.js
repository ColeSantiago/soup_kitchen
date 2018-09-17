import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export const SignInBtn = props => (
	<RaisedButton label="Sign In" primary={true} onClick={props.onClick} {...props} />
);