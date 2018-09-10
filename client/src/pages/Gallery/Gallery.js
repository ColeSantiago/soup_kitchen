import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import request from "superagent";

import API from "../../utils/API";
// import "./Gallery.css";

// components
import { PhotoList, PhotoListItem } from "../../components/PhotoListCollection";

// material ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from 'material-ui/Snackbar';
// import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const style = {
  container: {
    position: 'relative',
  },
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
  },
};

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFileCloudinaryUrl: "",
			gallery: [],
			user: [],
			admin: false,
			open: false,
			photoLimit: 10,
			loading: false
		};
	};

	componentWillMount() {
		this.loadGallery();

	};

	// getting the current collection
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
				<div>
					<Link to="/dashboard">
                        <IconButton
                          iconStyle={style.mediumIcon}
                          style={style.medium}
                        >
                            <ActionHome />
                        </IconButton>
                    </Link>
					{this.state.admin ? (
						<div className="dropzone-div">
							<Dropzone
								multiple={false}
								accept="image/*"
								onDrop={this.onImageDrop.bind(this)}
							>	
								<div style={style.container}>
									{this.state.loading ? (

										<RefreshIndicator
									      size={40}
									      left={10}
									      top={0}
									      status="loading"
									      style={style.refresh}
									    />
										) : (
												<p className="drop-text">Drop an image or click select a file to upload. </p>
											)}
								</div>
							</Dropzone>    
						</div>
					) : (
			                null
						)}
						<div className="gallery">
			                {this.state.gallery.length ? (
			                    <PhotoList>
			                        {this.state.gallery.slice(0, this.state.photoLimit).map(photo => (
			                            <PhotoListItem 
			                                key={photo.id}
			                                id={photo.id} 
			                                url={photo.photo_link}     
			                            >
			                            {this.state.admin ? (
			                            	<div>
			                            		<button className="delete" onClick={() => this.deletePhoto(photo.id)}>delete</button>
			                            	</div>
			                            	) : (
			                            			null
												)}
			                            </PhotoListItem>
			                        ))}
			                        <button className="load-more-btn" onClick={this.loadMore.bind(this)}>
	                                    Load More
	                                </button>
			                    </PhotoList>
			                ) : (
			                		<p>There are no photos yet!</p>
			                	)}
			            </div>
		                <Snackbar
		                  open={this.state.open}
		                  message="Photo Uploaded"
		                  autoHideDuration={4000}
		                  onRequestClose={this.handleRequestClose}
		                />
		        </div>
			</MuiThemeProvider>
		);
	}
}

export default Gallery;