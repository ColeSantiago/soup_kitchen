import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import API from '../../utils/API';
import './MemberPage.css';
// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
// icons
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

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

class MemberPage extends Component {
    state = {
        user: [],
        login_status: false,
        admin: false,
        members: [],
    };

    componentDidMount() {
    	this.loadMemberPage();
    };

    // loads all memebers with their info
    loadMemberPage = () => {
        API.loadMemberPage()
        .then(res => {this.setState({
            login_status: res.data.login_status,
            user: res.data.user,
            admin: res.data.user.admin,
            members: res.data.members,
        })})
        .catch(err => console.log(err));
    };

    // delete memeber
    deleteMember = (id) => {
        if(window.confirm('Are you sure you want to delete this member? This cannot be undone.')) {
            let memberID = {
                id: id
            }
            API.deleteMember(memberID)
            .then(res => {
                this.loadMemberPage();
            })
            .catch(err => console.log(err));
        }
    };

    // change admin status
    toggleAdmin = (id, admin) => {
        let memberInfo = {
            id: id,
            admin: admin
        }
        API.toggleAdmin(memberInfo)
        .then(res => {
            this.loadMemberPage();
        })
        .catch(err => console.log(err));
    };

    render() {
        return(
            <MuiThemeProvider>
            	{this.state.login_status === true ? (
                    <div className='member-div'>
                        <div className='member-home-btn-div'>
                            <Link to='/dashboard'>
                                <IconButton
                                    iconStyle={styles.mediumIcon}
                                    style={styles.medium}
                                >
                                    <ActionHome className='member-home-btn' />
                                </IconButton>
                            </Link>
                            <h1 className='member-header'>Members</h1>
                        </div>
                        {this.state.members.length ? (
                            <List className='member-list'>
                                {this.state.members.map(member => (
                                <ListItem
                                    key={member.id}
                                    primaryText={`${member.first_name} ${member.last_name}`}
                                    leftIcon={<PersonIcon />}
                                    disabled={false}
                                    primaryTogglesNestedList={true}
                                    nestedItems={[
                                        <ListItem
                                            key={1}
                                            primaryText={member.email}
                                            leftIcon={<MailIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={2}
                                            primaryText={member.phone_number}
                                            leftIcon={<CallIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={3}
                                            primaryText={member.affiliation}
                                            leftIcon={<LocationCityIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={4}
                                            primaryText={`Community Service: ${member.community_service}`}
                                            leftIcon={<SentimentSatisfiedAltIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={5}
                                            primaryText={`Admin: ${member.admin}`}
                                            leftIcon={<SchoolIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={6}
                                            primaryText='Member Options'
                                            leftIcon={<MenuIcon />}
                                            primaryTogglesNestedList={true}
                                            nestedItems={[
                                                <ListItem
                                                    key={1}
                                                    primaryText='Change Admin Status'
                                                    primaryTogglesNestedList={true}
                                                    onClick={() => this.toggleAdmin(member.id, member.admin)}
                                                    leftIcon={<SchoolIcon />} 
                                                />,
                                                <ListItem
                                                    key={2}
                                                    primaryText='Delete Member'
                                                    primaryTogglesNestedList={true}
                                                    onClick={() => this.deleteMember(member.id)}
                                                    leftIcon={
                                                        <DeleteForeverIcon />
                                                    }
                                                />,
                                            ]}
                                        />,
                                    ]}
                                />
                                ))}
                            </List>
                        ) : (null)} 
                    </div>
                ) : (<div>Please <Link to='/signin'>sign in</Link> to see this page, and confirm that you are an Admin.</div>)}
            </MuiThemeProvider>
        );
    }
}

export default withRouter(MemberPage);