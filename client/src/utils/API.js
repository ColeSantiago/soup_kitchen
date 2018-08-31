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
  	logoutMember: function() {
  		return axios.get("/api/kitchen/logout");
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
  	deleteDate: function(dateID) {
  		return axios.post("/api/kitchen/deletedate", dateID);
  	},
  	loadJobSignUp: function(dateID) {
  		return axios.get("/api/kitchen/jobsignup/date/" + dateID)
  	},
  	jobSignUp: function(userAndJob) {
  		return axios.post("/api/kitchen/jobsignup", userAndJob)
  	},
  	jobUnSignUp: function(id) {
  		return axios.post("/api/kitchen/jobunsignup", id)
  	},
  	deleteJob: function(id) {
  		return axios.post("/api/kitchen/deletejob", id)
  	},
  	mealSignUp: function(userAndMeal) {
  		return axios.post("/api/kitchen/mealsignup", userAndMeal)
  	},
  	mealUnSignUp: function(id) {
  		return axios.post("/api/kitchen/mealunsignup", id)
  	},
  	deleteMeal: function(id) {
  		return axios.post("/api/kitchen/deletemeal", id)
  	},
  	createMeal: function(newMealData) {
  		return axios.post("/api/kitchen/createmeal", newMealData)
  	},
  	loadMemberPage: function() {
  		return axios.get("/api/kitchen/memberpage")
  	},
  	deleteMember: function(id) {
  		return axios.post("/api/kitchen/deletemember", id)
  	},
  	toggleAdmin: function(memberInfo) {
  		return axios.post("/api/kitchen/toggleadmin", memberInfo)
  	},
};