import React, { Component } from "react";
import API from "../../utils/API";

class Dashboard extends Component {
	state = {
		login_status: false
	};
	
	componentDidMount() {
		API.loadDashboard()
    	.then(res => {
    		this.setState({login_status: res.data.login_status})
   		})
    	.catch(err => console.log(err));
	};

  render() {
    return (
    	<div>
	    	{this.state.login_status === true ? (
	      		<div>Hi</div>
	      	) : (<div>Please sign in to see this page</div>
	    	)}
	    </div>
    );
  }
}

export default Dashboard;