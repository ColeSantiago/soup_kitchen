import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import API from '../../utils/API';
import './JobSignUp.css';
// components
import { Input } from '../../components/CreateMealForm';
import { List, ListItem } from '../../components/JobList';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import BlockIcon from '@material-ui/icons/Block';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const styles = {
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
        newMeal: '',
    };

    componentDidMount() {
        this.loadJobSignUp();
    };

    // loads up jobs and meals and if they are taken or not
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

    // signs up the user for a job
    jobSignUp = (id) => {
        let userAndJob = {
            id: id,
            member_ID: this.state.user.id,
            member_name: this.state.user.first_name,
            email: this.state.user.email,
        };
        API.jobSignUp(userAndJob)
        .then(result => {
            this.loadJobSignUp();
        })
    };

    // signs up the user for a meal
    mealSignUp = (id) => {
        let userAndMeal = {
            id: id,
            member_ID: this.state.user.id,
            member_name: this.state.user.first_name,
            email: this.state.user.email,
        };
        API.mealSignUp(userAndMeal)
        .then(result => {
            this.loadJobSignUp();
        })
    };

    // un-signs up job
    jobUnSignUp = (id) => {
        if(window.confirm('This job will no longer be signed up for.')) {
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
        }
    };

    // un-signs up meal
    mealUnSignUp = (id) => {
        if(window.confirm('This meal will no longer be signed up for.')) {
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
        }
    };

    // admin delete job
    deleteJob = (id) => {
        if(window.confirm('Are you sure you want to delete this job? This cannot be undone.')) {
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
        }
    };

    // admin delete meal
    deleteMeal = (id) => {
        if(window.confirm('Are you sure you want to delete this meal?')) {
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
        }
    };

    // handles form input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    // handles form submit to create new meal
    handleFormSubmit = event => {
        if(this.state.newMeal) {
            let newMealData = {
                date_ID: this.props.match.params.id,
                meal: this.state.newMeal,
                date: this.state.mealsTaken.date
            }
            API.createMeal(newMealData)
            .then(result => {
                this.setState({newMeal: ''})
                this.loadJobSignUp();
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            alert('Add a meal!');
        }
    };

    render() {
        return (
            <div className='signup-wrapper'>
                <MuiThemeProvider>
                    {this.state.login_status === true ? (
                        <div>
                            <div className='signup-header'>
                                <Link to='/dashboard'>
                                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                                        <ActionHome className='signup-home-btn'/>
                                    </IconButton>
                                </Link>
                                <h1 className='signup-title'>Bayonne Soup Kitchen Sign Up</h1>
                            </div>
                            <Tabs value={this.state.value} onChange={this.handleChange}>
                                <Tab label='Job Sign Up' value='a'>
                                    <div className='signup-headings'>
                                        <h2>Please sign up for one job.</h2>
                                        <h2>All Staff helps to set up and clean up. Arrival time 3:00pm***</h2>
                                    </div>
                                    <div className='all-jobs'>
                                        <div className='jobsNeeded-div'>
                                            <h1 className='signup-sub-heading'>Jobs Needed</h1>
                                            {this.state.jobsNeeded.length ? (
                                                <List>
                                                    {this.state.jobsNeeded.map(jobNeeded => (
                                                        <ListItem 
                                                            key={jobNeeded.id}
                                                            id={jobNeeded.id} 
                                                            title={jobNeeded.job} 
                                                        >
                                                        <IconButton tooltip='Sign Me Up' touch={true} tooltipPosition='top-right'>
                                                            <HowToRegIcon className='sign-up-btn' onClick={() => this.jobSignUp(jobNeeded.id)}/>
                                                        </IconButton>
                                                        {this.state.admin ? (
                                                            <IconButton tooltip='Delete Job' touch={true} tooltipPosition='top-right'>
                                                                <DeleteForeverIcon className='delete-job' onClick={() => this.deleteJob(jobNeeded.id)} />
                                                            </IconButton>
                                                        ) : (
                                                                null
                                                            )}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (<p>All Jobs are signed up for. Thank You!</p>)}
                                        </div>
                                        <div className="inner"></div>
                                        <div className='jobsTaken-div'>
                                            <h1 className='signup-sub-heading'>Jobs Claimed</h1>
                                            {this.state.jobsTaken.length ? (
                                                <List>
                                                    {this.state.jobsTaken.map(jobTaken => (
                                                        <ListItem 
                                                            key={jobTaken.id}
                                                            id={jobTaken.id} 
                                                            title={jobTaken.job}
                                                            takenBy={jobTaken.member_name} 
                                                        >
                                                        {this.state.user.id === jobTaken.memberId ? (
                                                            <IconButton tooltip='Nevermind' touch={true} tooltipPosition='top-right'>
                                                                <BlockIcon className='nevermind-btn' onClick={() => this.jobUnSignUp(jobTaken.id)}/>
                                                            </IconButton>
                                                        ) : (null)}
                                                        {this.state.admin ? (
                                                            <IconButton tooltip='Unassign Job' touch={true} tooltipPosition='top-right'>
                                                                <RemoveCircleIcon className='delete-job' onClick={() => this.jobUnSignUp(jobTaken.id)}/>
                                                            </IconButton>
                                                        ) : ( null)}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (<p>No one has signed up for anything yet!</p>)}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab label='Meal Sign Up' value='b'>
                                    <div className='signup-headings'>
                                        <h2>All food/bread to be dropped off at All Saints Catholic Academy cafeteria at 3:00pm</h2>
                                        <div className='signup-admin-div'>
                                            {this.state.admin ? (
                                                <form className='add-meal-form'>
                                                    <label>Add A Meal Here:</label>
                                                    <Input
                                                        value={this.state.newMeal}
                                                        onChange={this.handleInputChange}
                                                        name='newMeal'
                                                        floatingLabelText='Add a Meal'
                                                    />
                                                    <FloatingActionButton mini={true}>
                                                      <ContentAdd onClick={this.handleFormSubmit} />
                                                    </FloatingActionButton>
                                                </form>
                                            ) : (null)}
                                        </div>
                                    </div>
                                    <div className='all-meals'>
                                        <div className='mealsNeeded-div'>
                                            <h1 className='signup-sub-heading'>Meals Needed</h1>
                                            {this.state.mealsNeeded.length ? (
                                                <List>
                                                    {this.state.mealsNeeded.map(mealNeeded => (
                                                        <ListItem 
                                                            key={mealNeeded.id}
                                                            id={mealNeeded.id} 
                                                            title={mealNeeded.meal}
                                                            takenBy={mealNeeded.member_name} 
                                                        >
                                                        <IconButton tooltip='Sign Me Up' touch={true} tooltipPosition='top-right'>
                                                            <HowToRegIcon className='sign-up-btn' onClick={() => this.mealSignUp(mealNeeded.id)}/>
                                                        </IconButton>
                                                        {this.state.admin ? (
                                                            <IconButton tooltip='Delete Meal' touch={true} tooltipPosition='top-right'>
                                                                <DeleteForeverIcon className='delete-job' onClick={() => this.deleteMeal(mealNeeded.id)}/>
                                                            </IconButton>
                                                        ) : (null)}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (<p>All Meals are signed up for. Thank You!</p>)}
                                        </div>
                                        <div className="inner"></div>
                                        <div className='mealsTaken-div'>
                                            <h1 className='signup-sub-heading'>Meals Claimed</h1>
                                            {this.state.mealsTaken.length ? (
                                                <List>
                                                    {this.state.mealsTaken.map(mealTaken => (
                                                        <ListItem 
                                                            key={mealTaken.id}
                                                            id={mealTaken.id} 
                                                            title={mealTaken.meal}
                                                            takenBy={mealTaken.member_name} 
                                                        >
                                                        {this.state.user.id === mealTaken.memberId ? (
                                                            <IconButton tooltip='Nevermind' touch={true} tooltipPosition='top-right'>
                                                                <BlockIcon className='nevermind-btn' onClick={() => this.mealUnSignUp(mealTaken.id)}/>
                                                            </IconButton>
                                                        ) : (null)}
                                                        {this.state.admin ? (
                                                            <IconButton tooltip='Unassign Meal' touch={true} tooltipPosition='top-right'>
                                                                <RemoveCircleIcon className='delete-job' onClick={() => this.mealUnSignUp(mealTaken.id)}/>
                                                            </IconButton>
                                                        ) : (null)}
                                                            <Divider />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (<p>No one has signed up for anything yet!</p>)}
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    ) : (<div>Please <Link to='/signin'>sign in</Link> to see this page</div>)}
                </MuiThemeProvider>
            </div> 
        );
    }
}

export default withRouter(JobSignUp);