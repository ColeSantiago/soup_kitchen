import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
// components
import { Input, RequestBtn } from '../../components/RequestForm';
import Footer from '../../components/Footer';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
// import './RequestSignUp.css';

// styles for icons
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

class ForgotPassword extends Component {
    state = {
        email: '',
        requested: false,
        noEmail: false
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // handles form submit to create a user
    handleFormSubmit = event => {
        if(this.state.email !== '') {
            let resetInfo = {
                email: this.state.email,
            }
            API.forgotPassword(resetInfo)
            .then(res => {
                this.setState({
                    requested: res.data.requested,
                    noEmail: res.data.noEmail
                })
            })
            .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        {this.state.requested === false ? (
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
                                    <h1>Forgot Password</h1>
                                    <form className='form'>
                                        <Input
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                            name='email'
                                            floatingLabelText='Email'
                                            floatingLabelFixed={true}
                                        />
                                        <RequestBtn onClick={this.handleFormSubmit} />
                                    </form>
                                </div>
                            </div>
                        ) : (
                                <div>
                                    {this.state.noEmail === false ? (
                                        <p>You have submitted a request to change your password. If your email exists in our 
                                        records you will receive further directions.<Link to='/'>Click here </Link>
                                        to go back to our HomePage.</p>
                                    ) : (
                                            <p>No email found. <Link to='/signin'>Go Back</Link> </p>
                                        )
                                    }
                                </div>
                            )
                        }
                        <Footer/>
                    </div>
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default ForgotPassword;