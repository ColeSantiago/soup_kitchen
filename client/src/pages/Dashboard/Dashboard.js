import React, { Component } from 'react';
import API from '../../utils/API';
import { withRouter } from "react-router";
import DashboardPhoto from './images/group_photo.jpg'
import './Dashboard.css';
// components
import { List, ListItem } from '../../components/DatesList';
import SignOutBtn from '../../components/SignOutBtn';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// icons
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuIcon from '@material-ui/icons/Menu';

class Dashboard extends Component {
	state = {
		login_status: false,
		dates: [],
		admin: false,
		member: [],
		newDate: null,
		user: [],
		announcementText: '',
		announcement: '',
		open: false,
		nameInput: '',
		contactText: '',
		emailInput: '',
	};
	
	componentDidMount() {
		this.loadDashboard();
	};

	// loads the user, checks for admin, and if theres an announcement
	loadDashboard = () => {
		API.loadDashboard()
    	.then(res => {
    		this.setState({
    			login_status: res.data.login_status,
    			user: res.data.user,
    			admin: res.data.user.admin
    		})
    		if (res.data.announcement[0] === undefined) {
    			this.setState({announcement: ''})
    		} else {
    			this.setState({announcement: res.data.announcement[0].text})	
    		}
   		})
    	.catch(err => console.log(err));
    	this.loadDates();
	};

	// loads dates if any
	loadDates = () => {
		API.loadDates()
		.then(res => {
			this.setState({ dates: res.data.dates})
		})
	};

	// handles form input for calender
  	handleCalInputChange = (event, date) => {
  		this.setState({newDate: date})
	};

	// handles form submit to create a date
  	handleCalFormSubmit = event => {
	    API.createDate({
            newDate: this.state.newDate,
          })
        .then(res => {
			this.loadDates();   
        })
        .catch(err => console.log(err));
        this.setState({newDate: null})
	};

	// disables all days but saturdays for material ui calender
	disableDays = (date) => {
  		return date.getDay() === 0 || 
  		date.getDay() === 1 || 
  		date.getDay() === 2 || 
  		date.getDay() === 3 || 
  		date.getDay() === 4 || 
  		date.getDay() === 5;
	};

	// deletes date
	deleteDate = (id) => {
		if(window.confirm('Are you sure you want to delete this date? All data will be deleted.')) {
			let dateID = {
				id: id
			}
			API.deleteDate(dateID)
			.then(res => this.loadDates())
		    .catch(err => console.log(err));
		    this.loadDates();
	    }
	};

	// handles menu toggle
	handleToggle = () => this.setState({open: !this.state.open});

  	handleClose = () => this.setState({open: false});

	// handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    // submit for announcements
    handleFormSubmit = () => {
    	if(this.state.announcementText) {
    		let announcementText = {
    			text: this.state.announcementText
    		}
    		API.updateAnnouncement(announcementText)
    		.then(res => { 
    			this.setState({
	    			announcementText: '',
	    			announcement: res.data.text
	    		})
    			this.loadDashboard()
    		})
    		.catch(err => console.log(err));
    	}
    };

    // submit for contact form
    handleContactFormSubmit = () => {
    	if (this.state.nameInput && this.state.emailInput && this.state.contactText) {
    		let contactInfo = {
    			name: this.state.nameInput,
    			email: this.state.emailInput,
    			message: this.state.contactText
    		}
    		API.contactSoupKitchen(contactInfo)
    		.then(res => {
    			this.setState({
    				nameInput: '',
    				emailInput: '',
    				contactText: ''
    			})
    			alert('Your message has been received by The Bayonne Soup Kitchen. Please allow us a few business days to respond.');
    			this.loadDashboard()
    		})
    		.catch(err => console.log(err));
    	} else {
    		alert('Please fill out all areas to contact the soup kitchen.')
    	}
    }

	render() {
	    return (
	    	<MuiThemeProvider>
		    	<div>
			    	{this.state.login_status === true ? (
			      		<div className='dashboard-wrapper'>
			      			<div className='dashboard-header'>
				      			<img className='dashboard-photo' alt='dashboard' src={DashboardPhoto} />
				      			<div className='dashboard-message'>
				      				<h1 className='dashboard-heading'>Welcome to the Bayonne Soup Kitchen!</h1>
					      			<p className='dashboard-paragraph'>
					      				Thank you for being apart of our mission to help our neighbors in need! We hope to make
					      				signing up for the soup kitchen easier. Check the announcements below to see when your group is 
					      				hosting so you can sign up to help. <br></br> <br></br> Every week either a Parish, organization,
					      				or individual is the Administrator in charge. They will make sure all food, staff, and bread/key pick ups
					      				are taken care of. <br></br> <br></br> Our goal is to have EVERY WEEK permanently secured. We still have
					      				many weeks available and if you and/or a parish/organization are interested in joining our mission
					      				on a permanent basis, please contact us using the form at the bottom of this page. <br></br> <br></br>
					      				Thank you for the bottom of our hearts! <br></br> - Donna Santiago & Anita Neal
					      			</p>
					      		</div>
			      			</div>
			      			<div className='sidebar-toggle'>
			      				<h2 className='welcome'>Welcome {this.state.user.first_name}!</h2>
			      				<IconButton touch={true}>
				      				<MenuIcon className='menu-icon' label="Toggle Drawer" onClick={this.handleToggle}/>
	          					</IconButton>
			      			</div>
			      			<Drawer 
			      				docked={false}
						        open={this.state.open}
						        onRequestChange={(open) => this.setState({open})}
			      			>
					          	<MenuItem><Link className='menu-item' to='/'><SignOutBtn onClick={() => API.logoutMember()} /></Link></MenuItem>
					          	<MenuItem><Link className='menu-item' to='/updateinfo'>Update Your Personal Info</Link></MenuItem>
					          	<MenuItem><Link className='menu-item' to='/gallery'>Photo Gallery</Link></MenuItem>
					          	{this.state.admin ? (
				      					<MenuItem><Link className='menu-item' to='/memberpage'>Member List</Link></MenuItem>
				      			) : (null)}
					        </Drawer>
			      			<div className='announcement-div'>
			      				<p>{this.state.announcement}</p>
			      			</div>
			      			{this.state.admin ? (
				      			<div className='admin-div'>
				      				<h1 className='admin-heading'>Admin Specific</h1>
				      				<Divider />
					      			<div className='admin-info'>
					      				<div className='meal-outline'>
					      					<h1 className='meal-outline-heading'>Weekly Meal Outline</h1>
					      					<ul>
					      						<li>Meals for approximately 50 guests</li>
					      						<br></br>
					      						<li>Main Meal</li>
					      						<li>4 Large aluminum trays</li>
					      						<li>(Ex...pasta, sausage & peppers, kielbasa, etc.)</li>
					      						<li>Or 4 Hams, turkeys, etc.</li>
					      						<br></br>
					      						<li>Side Dish (starch)</li>
					      						<li>3 Large aluminum trays (or 6 half ones)</li>
					      						<br></br>
					      						<li>Side dish (vegetable)</li>
					      						<li>3 Large aluminum trays (or 6 half ones)</li>
					      						<br></br>
					      						<li>Garden Salad with dressing on the side</li>
					      						<li>3 Large aluminum trays</li>
					      						<br></br>
					      						<li>1 Gallon of Milk</li>
					      						<br></br>
					      						<li>Mini pretzels or snack to put bowls on tables (optional)</li>
					      						<br></br>
					      						<li>2 bags of ice</li>
					      					</ul>
					      				</div>
						      		<Divider />
						      			<div className='schedule-div'>
						      				<h1 className='schedule-heading'>Weekly Schedule</h1>
					      					<h2>Friday</h2>
					      						<p>
					      							Pick up key from Blessed Miriam Teresa Rectory 326 Avenue C - Open from 9:30-5:30.
					      							Phone Number: 201-437-4090. If during a holiday weekend - please call Monday to make sure
					      							they are open on Friday or if the hours are changed.
					      						</p>
					      						<ul>
					      							<li>Pick up breads:</li>
					      							<li>7:30pm - 7:45pm - Judickes</li>
					      							<li>8:15 - Paulantos</li>
					      						</ul>
					      					<h2>Saturday</h2>
					      						<p>Arrive at Bayonne Soup Kitchen (All Saints Catholic Academy Cafeteria) at 3:00pm</p>
					      						<ul>
					      							<li>Set up 3:00pm - 4:00pm</li>
					      							<li>Serve 4:00pm - 5:00pm</li>
					      						</ul>
					      						<h1>Clean up promptly at 5:00pm (not before).</h1>
					      						<h2>Return key in slot of rectory door</h2>
					      						<h1>Thank you!!!</h1>
						      			</div>
							      	</div>
						      		<Divider />
					      			<div className='admin-forms'>
					      				<form className='date-form'>
					      					<label>Add a new Date here:</label>
						      				<DatePicker
						      					value={this.state.newDate}
						      					onChange={this.handleCalInputChange} 
						      					hintText='Add Another Saturday'
						      					shouldDisableDate={this.disableDays}
						      				/>
						      				<FloatingActionButton mini={true}>
                                                <ContentAdd onClick={this.handleCalFormSubmit} />
                                            </FloatingActionButton>
					      				</form>
					      				<form className='meal-form'>
					      					<label>Update the Announcement here:</label>
                                            <textarea
                                            	maxLength='1000'
                                            	placeholder='Max 1000 Characters'
                                            	className='announcement-textarea'
                                                value={this.state.announcementText}
                                                onChange={this.handleInputChange}
                                                name='announcementText'
                                            />
                                            <br></br>
                                            <FloatingActionButton mini={true}>
                                              <ContentAdd onClick={this.handleFormSubmit} />
                                            </FloatingActionButton>
                                        </form>
				      				</div>
				      			</div>
			      			) : (null)}
			      			<div className='dates-div'>
				      		 	<h1 className='date-heading'>Upcoming Soup Kitchen Dates</h1>
			                    <h2 className='date-sub-heading'>Click a date to sign up for a job or a meal.</h2>
				      			{this.state.dates.length ? (
			                        <List className='date-item'>
			                            {this.state.dates.map(date => (
				                            <ListItem 
				                            	className='date-item'
				                                key={date.id}
				                                id={date.id} 
				                                title={date.date} 
				                            >
					                          	{this.state.admin ? (
				                            		<DeleteForeverIcon className='delete-date' onClick={() => this.deleteDate(date.id)}/>
				                            	) : (null)}
				                              	<Divider />
				                            </ListItem>
			                            ))}
			                        </List>
			                    ) : (null)}
				      		</div>
				      		<div className='contact-form-div'>
				      			<form className='contact-form'>
			      					<label className='contact-label'>Contact The Bayonne Soup Kitchen:</label>
			      					<input
			      						placeholder='Your First and Last Name'
                                    	className='name-input'
                                        value={this.state.nameInput}
                                        onChange={this.handleInputChange}
                                        name='nameInput'
			      					/>
			      					<input
			      						placeholder='An email address where we can contact you'
                                    	className='email-input'
                                        value={this.state.emailInput}
                                        onChange={this.handleInputChange}
                                        name='emailInput'
			      					/>
                                    <textarea
                                    	maxLength='1000'
                                    	placeholder='Your message - Max 1000 Characters'
                                    	className='contact-textarea'
                                        value={this.state.contactText}
                                        onChange={this.handleInputChange}
                                        name='contactText'
                                    />
                                    <br></br>
                                    	<RaisedButton 
                                    		className='contact-submit-btn'
                                    		label="Submit" 
                                    		primary={true}
                                    		onClick={this.handleContactFormSubmit}
                                    	/>
                                </form>
				      		</div>
			      		</div>
			      	) : (<div>Please <Link to='/signin'>sign in</Link> to see this page</div>)}
			    </div>
		    </MuiThemeProvider>
	    );
	}
}

export default withRouter(Dashboard);