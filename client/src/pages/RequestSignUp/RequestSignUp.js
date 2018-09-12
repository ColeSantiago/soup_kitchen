import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
// import './RequestSignUp.css';
// components
import { Input, RequestBtn } from '../../components/RequestForm';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

class RequestSignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        applied: false
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // handles form submit to request to sign up 
    handleFormSubmit = event => {
        if(this.state.first_name && this.state.last_name && this.state.email !== '') {
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
            <div>
                <MuiThemeProvider>
                    <div>
                        {this.state.applied === false ? (
                            <div>
                                <Link to='/'>
                                    <IconButton
                                      iconStyle={style.mediumIcon}
                                      style={style.medium}
                                    >
                                        <ActionHome />
                                    </IconButton>
                                </Link>
                                <p>Are you affiliated with the Bayonne Soup Kitchen?</p>
                                <p>Enter your information and request to sign up:</p>
                                <form className='request-form'>
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
                                    <RequestBtn onClick={this.handleFormSubmit} />
                                </form>
                            </div>
                        ) : (
                                <p>Thank you for requesting to sign up! If your request is approved you will 
                                receive an email from us on the email you provided with instructions on how to 
                                complete your sign up. Please allow 1-2 days for us to respond. <Link to='/'>Click here </Link>
                                to go back to our HomePage.</p>
                            )
                        }
                    </div>
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default RequestSignUp;