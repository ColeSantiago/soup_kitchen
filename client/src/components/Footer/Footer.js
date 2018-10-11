import React from "react";
import FacebookPhoto from '../../pages/Homepage/images/facebook.png';
import './Footer.css'

const Footer = props => 
	<footer>
		<p className='administration'>Administration: Blessed Miriam Teresa Parish  
			<a rel='noopener noreferrer' target='_blank' href='https://www.facebook.com/groups/126477214107724/about/'>
				<img className='facebook-icon' src={FacebookPhoto} alt='facebook' />
			</a>
		</p>
	</footer>;

export default Footer;