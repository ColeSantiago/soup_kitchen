import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
// import './SignUp.css';
// component
import { Input, UpdateBtn } from '../../components/UpdateForm';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
// phone input
import PhoneInput from 'react-phone-number-input/basic-input';

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

class MemberSignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        affiliation: '',
        password: '',
        confirmPassword: '',
        value: '',
        errorMsg: '',
        user: []
    };

    componentDidMount() {
        this.loadUpdate();
    };

    // loads page with users info
    loadUpdate = () => {
        API.loadUpdate()
            .then(res => {this.setState({
                user: res.data.user,
                first_name: res.data.user.first_name,
                last_name: res.data.user.last_name,
                value: `${res.data.user.phone_number}`,
                email: res.data.user.email,
                affiliation: res.data.user.affiliation,
                password: '',
                confirmPassword: '',
            })
        })
        .catch(err => console.log(err));
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // handles form submit to updates a users info
    handleFormSubmit = event => {
        if(this.state.first_name && this.state.last_name && this.state.value && this.state.email && this.state.affiliation && this.state.password !== '') {
            if (this.state.password === this.state.confirmPassword) {
                let newUserInfo = {
                    id: this.state.user.id,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    phone_number:this.state.value,
                    email: this.state.email,
                    affiliation: this.state.affiliation,
                    password: this.state.password,
                }
                API.updateInfo(newUserInfo)
                .then(res => {
                    this.setState({
                        errorMsg: res.data.errorMsg
                    })
                    if (this.state.errorMsg) {
                       alert(this.state.errorMsg) 
                    } else {
                        alert('Your info has been updated')
                        this.loadUpdate();
                    }  
                })
                .catch(err => console.log(err));
            } else {
                alert ('Your passwords do not match');
            }
        } else {
            alert('Please make sure all areas are filled out correctly')
        }
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    {this.state.user !== null ? (
                        <div className='form-section'>
                            <Link to='/dashboard'>
                                <IconButton
                                    className='home-icon'
                                    iconStyle={style.mediumIcon}
                                    style={style.medium}
                                >
                                    <ActionHome />
                                </IconButton>
                            </Link>
                            <div className='form-wrapper'>
                                <h1>Update Your Personal Info Here:</h1>
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
                                    <PhoneInput
                                        country='US'
                                        placeholder='Phone Number'
                                        value={this.state.value}
                                        onChange={ value => this.setState({ value }) }
                                    />
                                    <Input
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        name='email'
                                        floatingLabelText='Email'
                                        floatingLabelFixed={true}
                                    />
                                    <Input
                                        value={this.state.affiliation}
                                        onChange={this.handleInputChange}
                                        name='affiliation'
                                        floatingLabelText='Affiliation'
                                        floatingLabelFixed={true}
                                    />
                                    <Input
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        name='password'
                                        type='password'
                                        floatingLabelText='Password'
                                        floatingLabelFixed={true}
                                    />
                                    <Input
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInputChange}
                                        name='confirmPassword'
                                        type='password'
                                        floatingLabelText='Confirm Password'
                                        floatingLabelFixed={true}
                                    />
                                    <UpdateBtn onClick={this.handleFormSubmit} />
                                </form>
                            </div>
                        </div>
                    ) : (
                            <div>Please <Link to='/signin'>sign in</Link> to see this page</div>
                        )
                    }
                </MuiThemeProvider>
            </div> 
        );
    } 
}

export default MemberSignUp;