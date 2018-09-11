import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export const RequestBtn = props => (
	<RaisedButton label="Submit Request" primary={true} onClick={props.onClick} {...props} className="RequestBtn" />
);