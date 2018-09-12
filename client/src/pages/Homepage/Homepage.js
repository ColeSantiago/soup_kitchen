import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SquadPhoto from './images/600x400.png';
import LocationPhoto from './images/300x250.png';
import MapMarker from './images/marker.svg.png';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_API_KEY
});

const markerStyle = {
	height: '50px'
}

class Homepage extends Component {

  	render() {
    	return (
    		<div>
    			<nav>
    				<Link className='login-link' to='/signin'>
                        Member Log In
                    </Link>
                    <Link className='request-link' to='/requestsignup'>
                        Request a Log In
                    </Link>
    			</nav>
    				<header>
		      			<h1 className='main-title'>Bayonne Soup Kitchen</h1>
		      				<h2 className='sub-title'>Helping our neighbors in need</h2>
		      			<img className='squad-photo' src={SquadPhoto} alt='squad' />
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
			      			<img className='location-photo' src={LocationPhoto} alt='location' />
			      			<p className='address'>
			      				All Saints Catholic Academy Cafeteria <br></br>
			      				19 West 13th Street
			      			</p> 
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
			    <footer>
			    	<p className='administration'>Administration: Blessed Miriam Teresa Parish</p>
			    	<p className='made-by'>Made by <a rel='noopener noreferrer' target='_blank' href='https://colesantiago.github.io/portfolio/'>Cole</a></p>
			    </footer>
	    	</div>
    	);
  	}
}

export default Homepage;