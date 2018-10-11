import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './Homepage.css';
import LocationPhoto from './images/soup_kitchen_outside.JPG';
// import HandsPhoto from './images/hands.jpg';
// import VolunteerPhoto from './images/volunteer.jpg';
// import SpoonsPhoto from './images/spoons.jpg';
import MapMarker from './images/marker.svg.png';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import ScrollAnimation from 'react-animate-on-scroll';
import { Fade } from 'react-slideshow-image';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_API_KEY
});

const markerStyle = {
	height: '50px',
};
 
const fadeProperties = {
  duration: 5000,
  transitionDuration: 900,
  infinite: true,
  arrows: false
}

let style = {
	background: 'white'
};

class Homepage extends Component {

	componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
	};

	componentWillUnmount = () =>  {
	    window.removeEventListener('scroll', this.handleScroll);
	};

	handleScroll = event =>  {
	    let scrollTop = event.srcElement.body.scrollTop,
	        itemTranslate = Math.min(0, scrollTop/3 - 60);
	        style = {
	        	transition: 'background-color 2000ms linear',
	        	background: '#00bdd4'
	        };
	    this.setState({
	      transform: itemTranslate
	    });
	};

  	render() {
    	return (
    		<MuiThemeProvider>
	    		<div className='homepage-div'>
	    			<nav style={style}>
	    				<p className='nav-p'>Are you a member or would like to become one? </p>
	    				<IconMenu
					      	iconButtonElement={<IconButton><MenuIcon /></IconButton>}
					      	anchorOrigin={{horizontal: 'left', vertical: 'top'}}
					      	targetOrigin={{horizontal: 'left', vertical: 'top'}}
					    >
					    	<Link className='nav-link' to='/signin'>
						      	<MenuItem primaryText='Member Log In'/>
				          	</Link>
				          	<Link className='nav-link' to='/requestsignup'>
				          		<MenuItem primaryText='Request a Log In'/>
				          	</Link>
					    </IconMenu>
				    </nav>
				    <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut' duration={4} animateOnce={true}>
	    				<header>
			      			<Fade {...fadeProperties}>
						    	<div className="each-fade">
						        	<div className="slideshow-1"></div>
						      	</div>
						      	<div className="each-fade">
						        	<div className="slideshow-2"></div>
						      	</div>
						      	<div className="each-fade">
						        	<div className="slideshow-3"></div>
						      	</div>
						    </Fade>
		    					<div className='header-text'>
				      				<h1 className='main-title'>Bayonne Soup Kitchen</h1>
				      				<h2 className='sub-title'>Helping Our Neighbors In Need</h2>
				      			</div>
			      		</header>
		      		</ScrollAnimation>
		      		<div className='info'>
		      			<h1 className='info-heading'>Who We Are</h1> <br></br>
		      			<p className='history'>The Bayonne Soup Kitchen was established in 2008. Our mission is to help our neighbors in need. 
		      			We do this by providing a meal every Saturday at 4pm. All are welcome! <br></br>  <br></br> We encourage you to become a member 
		      			so you can learn more about how you can be a part of this mission. If you belong to a parish group and/or 
		      			civic community group we welcome you to help us to continue this mission! <br></br> <br></br> When you sign up with us, please 
		      			state your parish or organization. Also, if you are a student needing community service hours, please mark the correct
		      			status. <br></br> <br></br> We look forward to volunteering with you!</p> <br></br>
		      			<ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
		      				<p className='time'> We serve a meal every Saturday from 4pm to 5pm. </p>
		      			</ScrollAnimation>
		      		</div>
		      		<div className='location'>
		      			<p className='address'>
		      				Our Location <br></br> <br></br>
			      			All Saints Catholic Academy Cafeteria <br></br>
			      			19 West 13th Street
			      		</p>
		      			<div className='location-info'>
			      			<img className='location-photo' src={LocationPhoto} alt='location' />
			      			<Map
			      				// eslint-disable-next-line
							  	style='mapbox://styles/mapbox/streets-v9'
							  	containerStyle={{
							    	height: '400px',
							    	width: '400px'
							  	}}
							  	center={[-74.125867, 40.65778]}
							  	zoom={[14]}
							>
								<Marker
									coordinates={[-74.125867, 40.65778]}
									anchor='bottom'>
									<img style={markerStyle} src={MapMarker} alt='marker'/>
								</Marker>
							</Map>
						</div>
		      		</div>
		    	</div>
	    	</MuiThemeProvider>
    	);
  	}
}

export default withRouter(Homepage);