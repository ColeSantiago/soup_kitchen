import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Input, SignUpBtn } from "../../components/SignUpForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import "./SignUp.css";

class MemberSignUp extends Component {
    state = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        parish: "",
        password: "",
        confirmPassword: "",
        allowSignIn: false
    };

    componentDidMount() {
        this.loadSignUp();
    };

    loadSignUp = () => {
        API.loadSignUp()
        .then(res => {this.setState({allowSignIn: res.data.allowSignIn})})
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
    API.createMember({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number:this.state.phone_number,
        email: this.state.email,
        parish: this.state.parish,
        password: this.state.password,
      })
    .then(res => {
        console.log(res.data)
        this.setState({allowSignIn: res.data.allowSignIn})
    })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
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
                      <Input
                        value={this.state.phone_number}
                        onChange={this.handleInputChange}
                        name="phone_number"
                        floatingLabelText="Phone Number"
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
                ) : (  <Link to="/signin">
                        <p>Registration Successful</p>
                        <p>Click here to sign in</p>
                    </Link>
            )}
        </MuiThemeProvider>
      </div> 
    );
  }
}

export default MemberSignUp;