import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
// import { Input, SignUpBtn } from "../../components/SignUpForm";
import { List, ListItem } from "../../components/JobList";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Divider from 'material-ui/Divider';
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
        jobsNeeded: [],
        jobsTaken:[],
        mealsNeeded: [],
        mealsTaken: [],
        user: [],
        admin: false,
    };

    componentDidMount() {
        this.loadJobSignUp();
    };

    loadJobSignUp = () => {
        API.loadJobSignUp(this.props.match.params.id)
        .then(res => {
            this.setState({
                login_status: res.data.login_status,
                jobsNeeded: res.data.jobsNeeded,
                jobsTaken: res.data.jobsTaken,
                mealsNeeded: res.data.mealsNeeded,
                mealsTaken: res.data.mealsTaken,
                user: res.data.user,
                admin: res.data.user.admin
            })
        })
        .catch(err => console.log(err));
    };

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    jobSignUp = (id) => {
        let userAndJob = {
            id: id,
            member_ID: this.state.user.id,
            member_name: this.state.user.first_name
        };
        API.jobSignUp(userAndJob)
        .then(result => {
            this.loadJobSignUp();
        })
    };

    mealSignUp = (id) => {
        let userAndMeal = {
            id: id,
            member_ID: this.state.user.id,
            member_name: this.state.user.first_name
        };
        API.mealSignUp(userAndMeal)
        .then(result => {
            this.loadJobSignUp();
        })
    };

    jobUnSignUp = (id) => {
        let jobID = {
            id: id
        }
        API.jobUnSignUp(jobID)
        .then(result => {
            console.log(result);
            this.loadJobSignUp();
        })
        .catch(error => {
            console.log(error)
        })
    };

    mealUnSignUp = (id) => {
        let mealID = {
            id: id
        }
        API.mealUnSignUp(mealID)
        .then(result => {
            this.loadJobSignUp();
        })
        .catch(error => {
            console.log(error)
        })
    };

    // // handles form input
    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({
    //       [name]: value
    //     });
    // };

    // // handles form submit to create a user
    // handleFormSubmit = event => {

    // };

    render() {
        return (
          <div>
            <MuiThemeProvider>
                {this.state.login_status === true ? (
                    <div>
                        <h1>Bayonne Soup Kitchen Sign Up</h1>
                              <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                              >
                                <Tab label="Job Sign Up" value="a">
                                  <div>
                                    <h2 style={styles.headline}>Please sign up for one job.</h2>
                                    <h2 style={styles.headline}>All Staff helps to set up and clean up. Arrival time 3:00pm***</h2>
                                        <div className="jobsNeeded-div">
                                            {this.state.jobsNeeded.length ? (
                                                <List>
                                                    {this.state.jobsNeeded.map(jobNeeded => (
                                                        <ListItem 
                                                            key={jobNeeded.id}
                                                            id={jobNeeded.id} 
                                                            title={jobNeeded.job} 
                                                        >
                                                        <button className="job-sign-up-btn" onClick={() => this.jobSignUp(jobNeeded.id)}>Sign Me Up</button>
                                                        {this.state.admin ? (
                                                            <button className="delete-job" onClick={() => this.deleteJob(jobNeeded.id)}> X </button>
                                                        ) : (
                                                                null
                                                            )}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (
                                                    null
                                                )}
                                        </div>
                                        <div className="jobsTaken-div">
                                            <h1 style={styles.headline}>Jobs Claimed</h1>
                                            {this.state.jobsTaken.length ? (
                                                <List>
                                                    {this.state.jobsTaken.map(jobTaken => (
                                                        <ListItem 
                                                            key={jobTaken.id}
                                                            id={jobTaken.id} 
                                                            title={jobTaken.job}
                                                            takenBy={jobTaken.member_name} 
                                                        >
                                                        {this.state.user.id === jobTaken.member_ID ? (
                                                            <button className="job-sign-up-btn" onClick={() => this.jobUnSignUp(jobTaken.id)}>
                                                                NeverMind
                                                            </button>
                                                        ) : (null)}
                                                        {this.state.admin ? (
                                                            <button className="delete-job" onClick={() => this.jobUnSignUp(jobTaken.id)}> X </button>
                                                        ) : (
                                                                null
                                                            )}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (
                                                    <p>No one has signed up for anything yet!</p>
                                                )}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab label="Meal Sign Up" value="b">
                                    <div>
                                        <h2 style={styles.headline}>All food/bread to be dropped off at All Saints Catholic Academy cafeteria at 3:00pm</h2>
                                        <div className="mealsNeeded-div">
                                                {this.state.mealsNeeded.length ? (
                                                    <List>
                                                        {this.state.mealsNeeded.map(mealNeeded => (
                                                            <ListItem 
                                                                key={mealNeeded.id}
                                                                id={mealNeeded.id} 
                                                                title={mealNeeded.meal}
                                                                takenBy={mealNeeded.member_name} 
                                                            >
                                                            <button className="meal-sign-up-btn" onClick={() => this.mealSignUp(mealNeeded.id)}>Sign Me Up</button>
                                                            {this.state.admin ? (
                                                                <button className="delete-meal" onClick={() => this.deleteMeal(mealNeeded.id)}> X </button>
                                                            ) : (
                                                                    null
                                                                )}
                                                                <Divider />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                ) : (
                                                        null
                                                    )}
                                            </div>
                                            <div className="mealsTaken-div">
                                                <h1 style={styles.headline}>Meals Claimed</h1>
                                                    {this.state.mealsTaken.length ? (
                                                        <List>
                                                            {this.state.mealsTaken.map(mealTaken => (
                                                                <ListItem 
                                                                    key={mealTaken.id}
                                                                    id={mealTaken.id} 
                                                                    title={mealTaken.meal}
                                                                    takenBy={mealTaken.member_name} 
                                                                >
                                                                {this.state.user.id === mealTaken.member_ID ? (
                                                                    <button className="job-meal-up-btn" onClick={() => this.mealUnSignUp(mealTaken.id)}>NeverMind</button>
                                                                ) : (null)}
                                                                {this.state.admin ? (
                                                                    <button className="delete-meal" onClick={() => this.mealUnSignUp(mealTaken.id)}> X </button>
                                                                ) : (
                                                                        null
                                                                    )}
                                                                    <Divider />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    ) : (
                                                            <p>No one has signed up for anything yet!</p>
                                                        )}
                                            </div>
                                    </div>
                                </Tab>
                            </Tabs>
                    </div>
                ) : (<div>Please <Link to="/signin">sign in</Link> to see this page</div>)}
            </MuiThemeProvider>
          </div> 
        );
    }
}

export default JobSignUp;