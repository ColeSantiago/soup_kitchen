import axios from 'axios';

// directs the client side info and functions to the server
export default {
	loadSignUp: function(token) {
		return axios.get('/api/kitchen/signup/' + token);
	},
	loadSignIn: function() {
		return axios.get('/api/kitchen/signin');
	},
	createMember: function(newMemberData) {
		return axios.post('/api/kitchen/signup', newMemberData);
	},
	loginMember: function(loginData) {
  	return axios.post('/api/kitchen/signin', loginData);
	},
	logoutMember: function() {
		return axios.get('/api/kitchen/logout');
	},
	loadDashboard: function() {
		return axios.get('/api/kitchen/dashboard');
	},
	loadDates: function() {
		return axios.get('/api/kitchen/dashboard');
	},
	createDate: function(newDateData) {
		return axios.post('/api/kitchen/createdate', newDateData);
	},
	deleteDate: function(dateID) {
		return axios.post('/api/kitchen/deletedate', dateID);
	},
	loadJobSignUp: function(dateID) {
		return axios.get('/api/kitchen/jobsignup/date/' + dateID)
	},
	jobSignUp: function(userAndJob) {
		return axios.post('/api/kitchen/jobsignup', userAndJob)
	},
	jobUnSignUp: function(id) {
		return axios.post('/api/kitchen/jobunsignup', id)
	},
	deleteJob: function(id) {
		return axios.post('/api/kitchen/deletejob', id)
	},
	mealSignUp: function(userAndMeal) {
		return axios.post('/api/kitchen/mealsignup', userAndMeal)
	},
	mealUnSignUp: function(id) {
		return axios.post('/api/kitchen/mealunsignup', id)
	},
	deleteMeal: function(id) {
		return axios.post('/api/kitchen/deletemeal', id)
	},
	createMeal: function(newMealData) {
		return axios.post('/api/kitchen/createmeal', newMealData)
	},
	loadMemberPage: function() {
		return axios.get('/api/kitchen/memberpage')
	},
	deleteMember: function(id) {
		return axios.post('/api/kitchen/deletemember', id)
	},
	toggleAdmin: function(memberInfo) {
		return axios.post('/api/kitchen/toggleadmin', memberInfo)
	},
  loadGallery: function() {
    return axios.get('/api/kitchen/gallery')
  },
  savePhoto: function(photoInfo) {
    return axios.post('/api/kitchen/savephoto', photoInfo)
  },
  deletePhoto: function(photoId) {
    return axios.post('/api/kitchen/deletephoto', photoId)
  },
  loadUpdate: function() {
    return axios.get('/api/kitchen/updateinfo')
  },
  updateInfo: function(memberId) {
    return axios.post('api/kitchen/updateinfo', memberId)
  },
  updateAnnouncement: function(announcementInfo) {
    return axios.post('/api/kitchen/updateannouncement', announcementInfo)
  },
  requestSignUp: function(requestInfo) {
    return axios.post('/api/kitchen/requestsignup', requestInfo)
  },
  forgotPassword: function(emailInfo) {
    return axios.post('/api/kitchen/forgotpassword', emailInfo)
  },
  loadResetPassword: function(token) {
    return axios.get('/api/kitchen/resetpassword/' + token)
  },
  changePassword: function(newPasswordInfo) {
    return axios.post('/api/kitchen/resetpassword', newPasswordInfo)
  },
};