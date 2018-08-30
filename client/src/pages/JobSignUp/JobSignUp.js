import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
// import { Input, SignUpBtn } from "../../components/SignUpForm";
import { List, ListItem } from "../../components/JobList";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Tabs, Tab} from 'material-ui/Tabs';
// import "./JobSignUp.css";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class JobSignUp extends Component {
    state = {
        value: 'a',
        login_status: false,
        jobs: [],
        user: []
    };

    componentDidMount() {
        this.loadJobSignUp();
    };

    loadJobSignUp = () => {
        API.loadJobSignUp(this.props.match.params.id)
        .then(res => {
            this.setState({
                login_status: res.data.login_status,
                jobs: res.data.jobs,
                user: res.data.user
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

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    // handles form submit to create a user
    handleFormSubmit = event => {

    };

    render() {
        return (
          <div>
            <MuiThemeProvider>
            {this.state.login_status === true ? (
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
              >
                <Tab label="Job Sign Up" value="a">
                  <div>
                    <h2 style={styles.headline}>Job Sign Up</h2>
                    <p>
                      Tabs are also controllable if you want to programmatically pass them their values.
                      This allows for more functionality in Tabs such as not
                      having any Tab selected or assigning them different values.
                    </p>
                  </div>
                </Tab>
                <Tab label="Meal Sign Up" value="b">
                  <div>
                    <h2 style={styles.headline}>Please sign up for one job.</h2>
                    <p>
                      This is another example of a controllable tab. Remember, if you
                      use controllable Tabs, you need to give all of your tabs values or else
                      you wont be able to select them.
                    </p>
                  </div>
                </Tab>
              </Tabs>
              ) : (<div>Please <Link to="/signin">sign in</Link> to see this page</div>)}
            </MuiThemeProvider>
          </div> 
        );
    }
}

export default JobSignUp;