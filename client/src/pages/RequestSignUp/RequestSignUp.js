import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './RequestSignUp.css';
// components
import { Input, RequestBtn } from '../../components/RequestForm';
import Footer from '../../components/Footer'
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import ReCAPTCHA from "react-google-recaptcha";

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
    button: {
        margin: 40
    }
};

class RequestSignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        captcha: false,
        applied: false
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onChange = value => {
        if(value) {
            this.setState({captcha: true})
        }
    };

    // handles form submit to request to sign up 
    handleFormSubmit = event => {
        if(this.state.first_name && this.state.last_name && this.state.email !== '' && this.state.captcha === true) {
            let requestInfo = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
            }
            API.requestSignUp(requestInfo)
            .then(res => {
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    applied: res.data.applied
                })
            })
            .catch(err => console.log(err));
        } else {
            alert('Please make sure all areas are filled out correctly')
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.applied === false ? (
                        <div className='form-section'>
                            <Link to='/'>
                                <IconButton
                                    className='home-icon'
                                    iconStyle={style.mediumIcon}
                                    style={style.medium}
                                >
                                    <ActionHome />
                                </IconButton>
                            </Link>
                            <div className='form-wrapper'>
                                <div className='request-p'>
                                    <p>Are you affiliated with the Bayonne Soup Kitchen?</p>
                                    <p>Enter your information and request to sign up:</p>
                                </div>
                                <form className='form'>
                                    <Input
                                        value={this.state.first_name}
                                        onChange={this.handleInputChange}
                                        name='first_name'
                                        floatingLabelText='First Name'
                                        floatingLabelFixed={true}
                                    />
                                    <Input
                                        value={this.state.last_name}
                                        onChange={this.handleInputChange}
                                        name='last_name'
                                        floatingLabelText='Last Name'
                                        floatingLabelFixed={true}
                                      />
                                    <Input
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        name='email'
                                        floatingLabelText='Email'
                                        floatingLabelFixed={true}
                                    />
                                    <ReCAPTCHA
                                        className='captcha'
                                        sitekey={`${process.env.REACT_APP_CAPTCHA_KEY}`}
                                        onChange={this.onChange}
                                    />
                                    <RequestBtn style={style.button} onClick={this.handleFormSubmit} />
                                </form>
                            </div>
                        </div>
                    ) : (
                            <p className='confirm-p'>Thank you for requesting to sign up! If your request is approved you will 
                            receive an email from us on the email you provided with instructions on how to 
                            complete your sign up. Please allow 1-2 days for us to respond. <Link to='/'>Click here </Link>
                            to go back to our HomePage.</p>
                        )
                    }
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RequestSignUp;