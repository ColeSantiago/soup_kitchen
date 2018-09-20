import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import API from '../../utils/API';
import './Gallery.css';
// photo upload
import Dropzone from 'react-dropzone';
import request from 'superagent';
// components
import { PhotoList, PhotoListItem } from '../../components/PhotoListCollection';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import BurstModeIcon from '@material-ui/icons/BurstMode';

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  }
};

// button that when clicked will either show all of the delete buttons or hide them
const NavButton = ({onClick}) => 
  	<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar" onClick={onClick}>
   		Delete Photos
  	</button>

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFileCloudinaryUrl: '',
			gallery: [],
			user: [],
			admin: false,
			open: false,
			photoLimit: 10,
			loading: false,
			dropdownVisible: false,
		};
	};

	componentWillMount() {
		this.loadGallery();
	};

	// loading all photos
	loadGallery = () => {
		API.loadGallery()
		.then(res =>  {
			this.setState({
				gallery: res.data.gallery,
				user: res.data.user,
				admin: res.data.user.admin
			})
		})
		.catch(err => console.log(err));
	};

	// loads 10 more photos to the dashboard when clicked
    loadMore () {
        this.setState({photoLimit: this.state.photoLimit + 10});
        this.loadGallery();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

	// deletes photos
	deletePhoto = id => {
		let photoId = {
			id: id
		}
	    API.deletePhoto(photoId)
	    .then(res => this.loadGallery())
	    .catch(err => console.log(err));
	    this.loadGallery();
	  };

	// snackbar function
	handleClick = () => {
        this.setState({
          open: true,
        });
    };

    // snackbar function
    handleRequestClose = () => {
        this.setState({
          open: false,
        });
    };

	// toggle to show and hide delete photo buttons
    toggleDropdown = () => this.setState(state => ({
	    dropdownVisible: !state.dropdownVisible,
	}));

    // uploads photos
	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});
		this.handleImageUpload(files[0]);
	};

	// uploads photos
	handleImageUpload(file) {
		this.setState({loading: true})
		setTimeout(() => this.setState({ loading: false }), 1500);
		let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
							.field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
							.field('file', file);

		upload.end((err, response) => {
			if (err) {
				throw err
			} if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url
				});
				let photoData = {
					photo_link: response.body.secure_url,
				}
				API.savePhoto(photoData)
				.then(res => console.log('Photo Uploaded'))
				.catch(err => console.log(err));
			}
			this.handleClick();
			this.loadGallery();
		});
	};

	render() {
		return (
			<MuiThemeProvider>
				<div className='gallery-wrapper'>
					<div className='gallery-header'>
						<Link to='/dashboard'>
	                        <IconButton
	                          	iconStyle={style.mediumIcon}
	                          	style={style.medium}
	                        >
	                            <ActionHome className='gallery-home-btn'/>
	                        </IconButton>
	                    </Link>
	                    <h1 className='gallery-heading'>Bayonne Soup Kitchen Photo Gallery</h1>
                    </div>
					{this.state.admin ? (
						<div className='dropzone-div'>
							<Dropzone
								className='dropzone'
								multiple={false}
								accept='image/*'
								onDrop={this.onImageDrop.bind(this)}
							>	
								<div>
									{this.state.loading ? (
										<RefreshIndicator
									      size={40}
									      left={10}
									      top={0}
									      status='loading'
									      style={style.refresh}
									    />
										) : (
												<IconButton tooltip='Click Here or Drag a Photo to Upload' touch={true} tooltipPosition='top-right'>
													<AddAPhotoIcon/>
												</IconButton>
											)
										}
								</div>
							</Dropzone>
        					<NavButton onClick={this.toggleDropdown} /> 
						</div>
					) : (null)}
						<div className='gallery-div'>
			                {this.state.gallery.length ? (
			                	<div>
				                    <PhotoList>
				                        {this.state.gallery.slice(0, this.state.photoLimit).map(photo => (
				                            <PhotoListItem
				                                key={photo.id}
				                                id={photo.id} 
				                                url={photo.photo_link}

				                            >
				                            {this.state.admin ? (
				                            	<div style={{visibility: this.state.dropdownVisible ? "visible" : "hidden"}}>
				                            		<IconButton tooltip='Delete Forever' touch={true} tooltipPosition='top-right'>
														<DeleteForeverIcon className='delete-photo-btn' onClick={() => this.deletePhoto(photo.id)}/>
													</IconButton>
												</div>
				                            ) : (null)}
				                            </PhotoListItem>
				                        ))}
				                    </PhotoList>
				                    <div className='load-more-div'>
				                    	<IconButton tooltip='Load More' touch={true} tooltipPosition='top-right'>
				                    		<BurstModeIcon className='load-more-btn' onClick={this.loadMore.bind(this)}/>
				                    	</IconButton>
				                    </div>
	                            </div>
			                ) : (<p>There's nothing here</p>)}
			            </div>
		                <Snackbar
		                  open={this.state.open}
		                  message='Photo Uploaded'
		                  autoHideDuration={4000}
		                  onRequestClose={this.handleRequestClose}
		                />
		        </div>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(Gallery);