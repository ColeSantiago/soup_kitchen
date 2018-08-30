import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export const CreateMealBtn = props => (
	<RaisedButton label="Add Meal" primary={true} onClick={props.onClick} {...props} className="CreateMealBtn" />
);