import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Input, RequestBtn } from "../../components/RequestForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
// import "./RequestSignUp.css";

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
        email: "",
        requested: false
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
        if(this.state.email !== "") {
            let resetInfo = {
                email: this.state.email,
            }
            API.forgotPassword(resetInfo)
            .then(res => {
                this.setState({
                    requested: res.data.applied
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
                            <div>
                                <Link to="/">
                                    <IconButton
                                      iconStyle={style.mediumIcon}
                                      style={style.medium}
                                    >
                                        <ActionHome />
                                    </IconButton>
                                </Link>
                                <h1>Forgot Password</h1>
                                <form className="forgot-form">
                                    <Input
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        name="email"
                                        floatingLabelText="Email"
                                        floatingLabelFixed={true}
                                    />
                                    <RequestBtn onClick={this.handleFormSubmit} />
                                </form>
                            </div>
                        ) : (
                                <p>You have submitted a request to change your password. If your email exists in our 
                                records you will receive further directions.<Link to="/">Click here </Link>
                                to go back to our HomePage.</p>
                            )
                        }
                    </div>
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default ForgotPassword;