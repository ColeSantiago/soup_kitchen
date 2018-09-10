import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

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

    deleteMember = (id) => {
        let memberID = {
            id: id
        }
        API.deleteMember(memberID)
        .then(res => {
            this.loadMemberPage();
        })
        .catch(err => console.log(err));
    };

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
                    <div className="member-div">
                        <Link to="/dashboard">
                            <IconButton
                              iconStyle={styles.mediumIcon}
                              style={styles.medium}
                            >
                                <ActionHome />
                            </IconButton>
                        </Link>
                        {this.state.members.length ? (
                            <List>
                                <Subheader>Members</Subheader>
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
                                            primaryText={`Admin: ${member.admin}`}
                                            leftIcon={<SchoolIcon />}
                                            disabled={true}
                                        />,
                                        <ListItem
                                            key={5}
                                            primaryText="Member Options"
                                            leftIcon={<MenuIcon />}
                                            primaryTogglesNestedList={true}
                                            nestedItems={[
                                                <ListItem
                                                    key={1}
                                                    primaryText="Change Admin Status"
                                                    primaryTogglesNestedList={true}
                                                    onClick={() => this.toggleAdmin(member.id, member.admin)}
                                                    leftIcon={<SchoolIcon />} 
                                                />,
                                                <ListItem
                                                    key={2}
                                                    primaryText="Delete Member"
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
                	) : (
                            <div>Please <Link to="/signin">sign in</Link> to see this page, and confirm that you are an Admin.</div>
                        )}

            </MuiThemeProvider>
        );
    }
}

export default MemberPage;