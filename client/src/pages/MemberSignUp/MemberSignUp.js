import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import API from '../../utils/API';
import './MemberSignUp.css';
// components
import { Input, SignUpBtn } from '../../components/SignUpForm';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
// phone input
import PhoneInput from 'react-phone-number-input/basic-input';

let style = {
    button: {
        margin: 40
    }
}

class MemberSignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        parish: '',
        checked: false,
        password: '',
        confirmPassword: '',
        allowSignIn: false,
        value: '',
        errorMsg: '',
        allowSignUp: false
    };

    componentDidMount() {
        this.loadSignUp();
    };

    // loads page and checks if there is already and user and if the token is correct
    loadSignUp = () => {
        API.loadSignUp(this.props.match.params.token)
        .then(res => {this.setState({
            allowSignIn: res.data.allowSignIn, 
            allowSignUp: res.data.allowSignUp,
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name
        })})
        .catch(err => console.log(err));
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    updateCheck() {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
    };

    // handles form submit to create a user
    handleFormSubmit = event => {
        if (this.state.first_name && this.state.last_name && this.state.value && this.state.email && this.state.parish && this.state.password !== '') {
            if (this.state.password === this.state.confirmPassword) {
                API.createMember({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    phone_number:this.state.value,
                    email: this.state.email,
                    parish: this.state.parish,
                    community_service: this.state.checked,
                    password: this.state.password,
                  })
                .then(res => {
                    this.setState({
                        allowSignIn: res.data.allowSignIn,
                        errorMsg: res.data.errorMsg
                    })
                    if (this.state.errorMsg) {
                       alert(this.state.errorMsg) 
                    }   
                })
                .catch(err => console.log(err));
            } else {
                alert ('Your passwords do not match');
            }
        } else {
            alert('Please make sure all areas are filled out')
        }
    };

    render() {
        return (
            <div className='form-section'>
                <MuiThemeProvider>
                    {this.state.allowSignUp === true ? (
                        <div className='form-wrapper'>
                            {this.state.allowSignIn === false ? (
                                <form className='form'>
                                    <h1 className='signup-h1'>Bayonne Soup Kitchen Approved Sign Up</h1>
                                    <Input
                                        value={this.state.first_name}
                                        onChange={this.handleInputChange}
                                        name='first_name'
                                        floatingLabelText='First Name'
                                    />
                                    <Input
                                        value={this.state.last_name}
                                        onChange={this.handleInputChange}
                                        name='last_name'
                                        floatingLabelText='Last Name'
                                      />
                                    <PhoneInput
                                        className='phone'
                                        country='US'
                                        placeholder='Phone Number'
                                        value={ this.state.value }
                                        onChange={ value => this.setState({ value }) } 
                                    />
                                    <Input
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        name='email'
                                        floatingLabelText='Email'
                                    />
                                    <Input
                                        value={this.state.parish}
                                        onChange={this.handleInputChange}
                                        name='parish'
                                        floatingLabelText='Affiliation'
                                    />
                                    <Input
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        name='password'
                                        type='password'
                                        floatingLabelText='Password'
                                    />
                                    <Input
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInputChange}
                                        name='confirmPassword'
                                        type='password'
                                        floatingLabelText='Confirm Password'
                                    />
                                    <Checkbox
                                      label="Will you need community service papers signed?"
                                      checked={this.state.checked}
                                      onCheck={this.updateCheck.bind(this)}
                                    />
                                    <SignUpBtn style={style.button} onClick={this.handleFormSubmit} />
                                </form>
                                ) : (  
                                        <Link className='to-sign-in' to='/signin'>
                                            <p>Registration Successful</p>
                                            <p>Click here to sign in</p>
                                        </Link>
                                    )
                                }
                        </div>
                    ) : (null)}
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default withRouter(MemberSignUp);