import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import API from '../../utils/API';
import './MemberSignIn.css';
// component
import { Input, SignInBtn } from '../../components/SignInForm';
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
    button: {
        margin: 40
    }
};

class MemberSignIn extends Component {
    state = {
        email: '',
        password: '',
        login_status: false,
        errorMsg: '',
    };

    componentDidMount() {
    	API.loadSignIn()
    	.then(res => {this.setState({login_status: res.data.login_status})})
    	.catch(err => console.log(err));
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // form submit to login user and set the states to true
    handleFormSubmit(event) {
    	event.preventDefault();
        API.loginMember({
            email: this.state.email,
            password: this.state.password,
        })
        .then(res => {
        	this.setState({
        		login_status: res.data.login_status,
        		errorMsg: res.data.errorMsg
        	})
        	if (this.state.errorMsg) {
        		alert(this.state.errorMsg)
        	}
		})
        .catch(err => console.log(err));
    };

    render() {
        return(
            <MuiThemeProvider>
                <div>
                	{this.state.login_status === false ? (
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
                            <h1 className='form-header'>Member Sign In</h1>
                            <form className='form' onSubmit={this.handleFormSubmit.bind(this)}>
                                <Input
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    name='email'
                                    hintText='Email'
                                    floatingLabelText='Email'
                                    floatingLabelFixed={true}
                                />
                                <Input
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    hintText='Password'
                                    floatingLabelText='Password'
                                    floatingLabelFixed={true}
                                    name='password'
                                    type='password'
                                />
                                <SignInBtn style={style.button} type='submit' />
                                <Link className='to-forgot-password' to='/forgotpassword'>
                                    Forgot Password
                               </Link>
                            </form>
                            </div>
                        </div> 
                    	) : ( 
                                <div className='to-dashboard'>
                                    <Link className='to-dashboard' to='/dashboard'>
                        		      Login Successful. Click here to go to your Dashboard
                        	       </Link>
                               </div>
                	       )
                    }
                </div>  
            </MuiThemeProvider>
        );
    }
}

export default withRouter(MemberSignIn);