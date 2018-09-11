import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Input, SignUpBtn } from "../../components/SignUpForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PhoneInput from "react-phone-number-input/basic-input";
// import "./SignUp.css";

class MemberSignUp extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        parish: "",
        password: "",
        confirmPassword: "",
        allowSignIn: false,
        value: "",
        errorMsg: "",
        allowSignUp: false
    };

    componentDidMount() {
        this.loadSignUp();
    };

    loadSignUp = () => {
        API.loadSignUp(this.props.match.params.token)
        .then(res => {this.setState({allowSignIn: res.data.allowSignIn, allowSignUp: res.data.allowSignUp})})
        .catch(err => console.log(err));
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
    if (this.state.password === this.state.confirmPassword) {
        API.createMember({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number:this.state.value,
            email: this.state.email,
            parish: this.state.parish,
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
        alert ("Your passwords do not match");
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
            {this.state.allowSignUp === true ? (
                <div>
                    {this.state.allowSignIn === false ? (
                        <form className="sign-up-form">
                            <Input
                                value={this.state.first_name}
                                onChange={this.handleInputChange}
                                name="first_name"
                                floatingLabelText="First Name"
                            />
                            <Input
                                value={this.state.last_name}
                                onChange={this.handleInputChange}
                                name="last_name"
                                floatingLabelText="Last Name"
                              />
                            <PhoneInput
                                country="US"
                                placeholder="Phone Number"
                                value={ this.state.value }
                                onChange={ value => this.setState({ value }) } 
                            />
                            <Input
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                floatingLabelText="Email"
                            />
                            <Input
                                value={this.state.parish}
                                onChange={this.handleInputChange}
                                name="parish"
                                floatingLabelText="Parish"
                            />
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                floatingLabelText="Password"
                            />
                            <Input
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                                name="confirmPassword"
                                type="password"
                                floatingLabelText="Confirm Password"
                            />
                            <SignUpBtn onClick={this.handleFormSubmit} />
                            <Link className="nevermind-link" to="/">
                                Nevermind..
                            </Link>
                        </form>
                        ) : (  
                            <Link to="/signin">
                                <p>Registration Successful</p>
                                <p>Click here to sign in</p>
                            </Link>
                    )}
                </div>
            ) : (null)}
        </MuiThemeProvider>
      </div> 
    );
  }
}

export default MemberSignUp;