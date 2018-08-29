import axios from "axios";

// directs the client side info and functions to the server
export default {
	loadSignUp: function() {
		return axios.get("/api/kitchen/signup");
	},
	loadSignIn: function() {
		return axios.get("/api/kitchen/signin");
	},
	createMember: function(newMemberData) {
		return axios.post("/api/kitchen/signup", newMemberData);
	},
  	loginMember: function(loginData) {
    	return axios.post("/api/kitchen/signin", loginData);
  	},
  	loadDashboard: function() {
  		return axios.get("/api/kitchen/dashboard");
  	},
  	loadDates: function() {
  		return axios.get("/api/kitchen/dashboard");
  	},
  	createDate: function(newDateData) {
  		return axios.post("/api/kitchen/createdate", newDateData);
  	},
};