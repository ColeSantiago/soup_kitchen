import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './Homepage.css';
import LocationPhoto from './images/300x250.png';
import MapMarker from './images/marker.svg.png';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

// import ScrollAnimation from 'react-animate-on-scroll';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_API_KEY
});

const markerStyle = {
	height: '50px'
};

class Homepage extends Component {

  	render() {
    	return (
    		<MuiThemeProvider>
	    		<div className='homepage-div'>
	    			<nav>
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
				    
	    				<header>
	    					
		    					<div className='header-text'>
				      				<h1 className='main-title'>Bayonne Soup Kitchen</h1>
				      				<h2 className='sub-title'>Helping Our Neighbors In Need</h2>
				      			</div>
			      			
			      		</header>
		      		
		      		<div className='info'>
		      			<p className='history'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend. 
		      			Aliquam erat volutpat. Nunc quis risus scelerisque, dictum justo id, cursus sapien. Aliquam 
		      			facilisis erat quis lacinia pharetra. Vestibulum aliquet justo quis enim vehicula fermentum. 
		      			Praesent pulvinar aliquam magna nec varius. Suspendisse facilisis pretium feugiat. Cras vel 
		      			feugiat neque, nec mollis elit. Integer at lorem in purus condimentum interdum in nec neque. 
		      			Praesent et porta risus, efficitur feugiat nibh. Aliquam non ligula dignissim, euismod odio sed, 
		      			vulputate magna.</p> <br></br>
		      			
		      				<p className='time'> We serve a meal every Saturday from 4pm to 5pm. </p>
		      			
		      		</div>
		      		<div className='location'>
		      			<p className='address'>
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