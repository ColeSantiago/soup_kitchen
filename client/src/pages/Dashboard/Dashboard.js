import React, { Component } from "react";
import API from "../../utils/API";
import DashboardPhoto from "./images/600x400.png"
import { List, ListItem } from "../../components/DatesList";
import { AddDateBtn } from "../../components/addDatesForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Divider from 'material-ui/Divider';
import { Link } from "react-router-dom";
import DatePicker from 'material-ui/DatePicker';

class Dashboard extends Component {
	state = {
		login_status: false,
		dates: [],
		admin: false,
		member: [],
		newDate: null,
		user: [],
	};
	
	componentDidMount() {
		API.loadDashboard()
    	.then(res => {
    		this.setState({
    			login_status: res.data.login_status,
    			user: res.data.user,
    			admin: res.data.user.admin
    		})
   		})
    	.catch(err => console.log(err));
    	this.loadDates();
	};

	loadDates = () => {
		API.loadDates()
		.then(res => {
			this.setState({ dates: res.data.dates})
		})
	};

	// handles form input
  	handleInputChange = (event, date) => {
  		this.setState({newDate: date})
	};

	// handles form submit to create a date
  	handleFormSubmit = event => {
	    API.createDate({
            newDate: this.state.newDate,
          })
        .then(res => {
			this.loadDates();   
        })
        .catch(err => console.log(err));
        this.setState({newDate: null})
	};

	disableDays = (date) => {
  		return date.getDay() === 0 || 
  		date.getDay() === 1 || 
  		date.getDay() === 2 || 
  		date.getDay() === 3 || 
  		date.getDay() === 4 || 
  		date.getDay() === 5;
	}

	render() {
	    return (
	    	<MuiThemeProvider>
		    	<div>
			    	{this.state.login_status === true ? (
			      		<div className="dashboard-wrapper">
			      			<div className="dashboard-message">
				      			<img className="dashboard-photo" alt="dashboard" src={DashboardPhoto} />
				      			<p className="dashboard-paragraph">
				      				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna eros. 
				      				Vivamus semper ex non nisl iaculis euismod. Quisque pulvinar enim eu ligula mattis 
				      				pharetra. Etiam nec rhoncus nibh, volutpat rhoncus elit. Ut id rhoncus ante. 
				      				Nulla lacinia purus magna, et sollicitudin odio porta bibendum. Proin ac tellus sed 
				      				libero blandit ullamcorper. Vivamus quis felis nisl. Suspendisse finibus tristique 
				      				maximus. Proin tempor ex justo, eget tempus diam commodo et. Fusce quam enim, vulputate 
				      				sit amet elementum vitae, porttitor a diam. Nunc mollis justo magna, id lacinia purus 
				      				consequat a. Maecenas elementum ex tristique arcu accumsan, eu ultricies nulla porttitor. 
				      				Morbi a rhoncus elit. Pellentesque ullamcorper nec mi at commodo
				      			</p>
			      			</div>
			      			<div className="dates-div">
				      		 	<h1 className="date-heading">Upcoming Soup Kitchen Dates</h1>
			                    <h2 className="date-sub-heading">Click a date to sign up for a job or a meal.</h2>
				      			{this.state.dates.length ? (
			                        <List>
			                            {this.state.dates.map(date => (
				                            <ListItem 
				                                key={date.id} 
				                                title={date.date} 
				                            >
				                              	<Divider />
				                            </ListItem>
			                            ))}
			                        </List>
			                    ) : (
			                        	null
			                        )}
				      		</div>
				      		<div className="sidebar">
				      			<h2>Welcome {this.state.user.first_name}!</h2>
				      			<ul>
				      				<li><Link to="/mealoutline">Weekly Meal Outline</Link></li>
				      				<li><Link to="/mealschedule">Weekly Meal Schedule</Link></li>
				      				<li><Link to="/updateinfo">Update Your Personal Info</Link></li>
				      				<li><Link to="/Forum">Forum</Link></li>
				      				{this.state.admin ? (
				      					<li><Link to="/memberlist">Member List</Link></li>
				      				) : (null)}
				      			</ul>
				      			{this.state.admin ? (
					      			<div className="date-pick-div">
					      				<form>
						      				<DatePicker 
						      					value={this.state.newDate}
						      					onChange={this.handleInputChange} 
						      					hintText="Add Another Saturday" 
						      					mode="landscape"
						      					shouldDisableDate={this.disableDays}
						      				/>
						      				<AddDateBtn onClick={this.handleFormSubmit}/>
					      				</form>
					      			</div>
				      			) : (null)}
				      		</div>
			      		</div>
			      	) : (
			      		<div>Please <Link to="/signin">sign in</Link> to see this page</div>
			    	)}
			    </div>
		    </MuiThemeProvider>
	    );
	}
}

export default Dashboard;