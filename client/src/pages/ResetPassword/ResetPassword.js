import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Input, RequestBtn } from "../../components/RequestForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import "./RequestSignUp.css";

class ResetPassword extends Component {
    state = {
        password: "",
        confirmPassword: "",
        member: [],
        allowReset: false,
        changed: false,
        errorMsg: ""
    };

    componentDidMount() {
        this.loadResetPassword();
    };

    loadResetPassword = () => {
        API.loadResetPassword(this.props.match.params.token)
        .then(res => {
            this.setState({
                member: res.data.member,
                allowReset: res.data.allowReset
            })
            if(res.data.errorMsg) {
                this.setState({errorMsg: res.data.errorMsg})
            }
        })
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
        if(this.state.password === this.state.confirmPassword) {
            let passwordInfo = {
                member: this.state.member,
                password: this.state.password,
            }
            API.changePassword(passwordInfo)
            .then(res => {
                this.setState({
                    password: "",
                    confirmPassword: "",
                    changed: res.data.changed,
                })
            })
            .catch(err => console.log(err));
        } else {
            alert("Passwords do not match")
        }
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        {this.state.allowReset === true ? (
                            <div>
                                {this.state.changed === false ? (
                                    <div>
                                        <p>Reset your password below</p>
                                        <form className="request-form">
                                            <Input
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                                name="password"
                                                type="password"
                                                floatingLabelText="New Password"
                                          />
                                          <Input
                                                value={this.state.confirmPassword}
                                                onChange={this.handleInputChange}
                                                name="confirmPassword"
                                                type="password"
                                                floatingLabelText="Confirm Password"
                                          />
                                            <RequestBtn onClick={this.handleFormSubmit} />
                                        </form>
                                    </div>
                                ) : (
                                        <p>Your password has been updated.<Link to="/signin"> Click here </Link>
                                        to sign in.</p>
                                    )
                                }
                            </div>
                        ) : (<p>{this.state.errorMsg}</p>)}
                    </div>
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default ResetPassword;