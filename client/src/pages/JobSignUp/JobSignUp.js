import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Input } from "../../components/CreateMealForm";
import { List, ListItem } from "../../components/JobList";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import BlockIcon from '@material-ui/icons/Block';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import "./JobSignUp.css";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
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
        newMeal: "",
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

    deleteJob = (id) => {
        let jobID = {
            id: id
        }
        API.deleteJob(jobID)
        .then(result => {
            this.loadJobSignUp();
        })
        .catch(error => {
            console.log(error)
        })
    };

    deleteMeal = (id) => {
        let mealID = {
            id: id
        }
        API.deleteMeal(mealID)
        .then(result => {
            this.loadJobSignUp();
        })
        .catch(error => {
            console.log(error)
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
        if(this.state.newMeal) {
            let newMealData = {
                date_ID: this.props.match.params.id,
                meal: this.state.newMeal,
                date: this.state.mealsTaken.date
            }
            API.createMeal(newMealData)
            .then(result => {
                this.setState({newMeal: ""})
                this.loadJobSignUp();
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            alert("Add a meal!");
        }

    };

    render() {
        return (
          <div>
            <MuiThemeProvider>
                {this.state.login_status === true ? (
                    <div>
                        <h1>Bayonne Soup Kitchen Sign Up</h1>
                        <Link to="/dashboard">
                            <IconButton
                              iconStyle={styles.mediumIcon}
                              style={styles.medium}
                            >
                                <ActionHome />
                            </IconButton>
                        </Link>
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
                                                        <IconButton tooltip="Sign Me Up" touch={true} tooltipPosition="top-right">
                                                            <HowToRegIcon className="job-sign-up-btn" onClick={() => this.jobSignUp(jobNeeded.id)}/>
                                                        </IconButton>
                                                        {this.state.admin ? (
                                                            <IconButton tooltip="Delete Job" touch={true} tooltipPosition="top-right">
                                                                <DeleteForeverIcon className="delete-job" onClick={() => this.deleteJob(jobNeeded.id)} />
                                                            </IconButton>
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
                                                            <IconButton tooltip="Nevermind" touch={true} tooltipPosition="top-right">
                                                                <BlockIcon className="job-sign-up-btn" onClick={() => this.jobUnSignUp(jobTaken.id)}/>
                                                            </IconButton>
                                                        ) : (null)}
                                                        {this.state.admin ? (
                                                            <IconButton tooltip="Unassign Job" touch={true} tooltipPosition="top-right">
                                                                <RemoveCircleIcon className="delete-job" onClick={() => this.jobUnSignUp(jobTaken.id)}/>
                                                            </IconButton>
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
                                                            <IconButton tooltip="Sign Me Up" touch={true} tooltipPosition="top-right">
                                                                <HowToRegIcon className="meal-sign-up-btn" onClick={() => this.mealSignUp(mealNeeded.id)}/>
                                                            </IconButton>
                                                            {this.state.admin ? (
                                                                <IconButton tooltip="Delete Meal" touch={true} tooltipPosition="top-right">
                                                                    <DeleteForeverIcon className="delete-meal" onClick={() => this.deleteMeal(mealNeeded.id)}/>
                                                                </IconButton>
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
                                                                    <IconButton tooltip="Nevermind" touch={true} tooltipPosition="top-right">
                                                                        <BlockIcon className="job-meal-up-btn" onClick={() => this.mealUnSignUp(mealTaken.id)}/>
                                                                    </IconButton>
                                                                ) : (null)}
                                                                {this.state.admin ? (
                                                                    <IconButton tooltip="Unassign Meal" touch={true} tooltipPosition="top-right">
                                                                        <RemoveCircleIcon className="delete-meal" onClick={() => this.mealUnSignUp(mealTaken.id)}/>
                                                                    </IconButton>
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
                                        <div>
                                            {this.state.admin ? (
                                                <form className="add-meal-form">
                                                    <Input
                                                        value={this.state.newMeal}
                                                        onChange={this.handleInputChange}
                                                        name="newMeal"
                                                        floatingLabelText="Add a Meal"
                                                    />
                                                    <FloatingActionButton mini={true}>
                                                      <ContentAdd onClick={this.handleFormSubmit} />
                                                    </FloatingActionButton>
                                                </form>
                                            ) : (
                                                    null
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