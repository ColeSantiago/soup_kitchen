import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
// component
import { Input, SignInBtn } from '../../components/SignInForm';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            <div className='wrapper'>
                <MuiThemeProvider>
                	{this.state.login_status === false ? (
                        <div className='sign-in-div'>
                            <form className='sign-in-form' onSubmit={this.handleFormSubmit.bind(this)}>
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
                                <SignInBtn className='sign-in' type='submit' />
                                <Link className='to-forgot-password' to='/forgotpassword'>
                                  Forgot Password
                               </Link>
                            </form>
                        </div> 
                    	) : ( 
                                <Link className='to-dashboard' to='/dashboard'>
                    		      Login Successful. Click here to go to your Dashboard
                    	       </Link>
                	       )
                    }
                </MuiThemeProvider>
            </div>
        );
    }
}

export default MemberSignIn;