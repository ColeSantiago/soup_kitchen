import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export const AddDateBtn = props => (
	<RaisedButton label="Add Date" primary={true} onClick={props.onClick} {...props} className="AddDateBtn" />
);