import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export const UpdateBtn = props => (
	<RaisedButton label="Update Info" primary={true} onClick={props.onClick} {...props} className="UpdateBtn" />
);