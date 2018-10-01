const router = require('express').Router();
const models = require('../../models/index.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// ---------GET ROUTES----------------------


// member sign in
router.get('/signin', (req, res) => {
	if(req.session.user && req.cookies.user_soup) {
        res.json({login_status: true});
	}
});

// member logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_soup) {
        res.clearCookie('user_soup');
        res.json({login_status: false});
    } else {
        res.json({login_status: false});
    }
});

// dashboard
router.get('/dashboard', function(req, res) {
    if (req.session.user && req.cookies.user_soup) {
        models.monthly_dates.findAll()
        .then(function(dateResults){
        	models.announcements.findAll()
        	.then(function(announcementResults) {
        		res.json({
	        		dates: dateResults, 
	        		login_status: true,
	        		user: req.session.user,
	        		announcement: announcementResults
	        	})
        	})	
        })
    } else {
        res.json({login_status: false});
    }
});

// job sign up for specific date
// -loads jobs and meals that are taken and not taken
router.get('/jobsignup/date/:id', function(req, res) {
	if (req.session.user && req.cookies.user_soup) {
		models.monthly_dates.findOne({where: {id: req.params.id}})
		.then(dateResult => {
			models.weekly_jobs.findAll({
				where: {
					monthlyDateId: req.params.id,
					is_taken: false
				} 
			})
			.then(jobsNeededResult => {
				models.weekly_jobs.findAll({
					where: {
						monthlyDateId: req.params.id,
						is_taken: true
					}
				})
				.then(jobsTakenResult => {
					models.weekly_meals.findAll({
						where: {
							monthlyDateId: req.params.id,
							is_taken: false
						}
					})
					.then(mealsNeededResult => {
						models.weekly_meals.findAll({
							where: {
								monthlyDateId: req.params.id,
								is_taken: true
							}
						})
						.then(mealsTakenResult => {
							res.json({
								date: dateResult,
								jobsNeeded: jobsNeededResult,
								jobsTaken: jobsTakenResult,
								mealsNeeded: mealsNeededResult,
								mealsTaken: mealsTakenResult,
								login_status: true,
								user: req.session.user 
							})
						})
					})
				})
			})	
		})
	} else {
        res.json({login_status: false});
    }
});

// all members page
router.get('/memberpage', function(req, res) {
	if (req.session.user && req.cookies.user_soup && req.session.user.admin) {
		models.member.findAll({
			order: [
            	['last_name', 'ASC'],
        	],
        })
		.then(result => {
			res.json({
				login_status: true,
            	user: req.session.user,
            	members: result
			})
		})
		.catch(error => {console.log(error)})
	} else {
		res.json({login_status: false})
	}

});

// gallery route
router.get('/gallery', function(req, res) {
	models.gallery.findAll({
		order: [
        	['id', 'DESC'],
    	],
    })
	.then(galleryResult => {
		res.json({
			gallery: galleryResult,
			user: req.session.user
		})
	})
	.catch(error => {console.log(error)})
});

// member sign up
router.get('/signup/:token', (req, res) => {
	models.signup_requests.findOne({where: {signUpToken: req.params.token, signUpTokenExpires: { [Op.gt]: Date.now()} }})
	.then(requestFound => {
		if (requestFound) {
			res.json({
				allowSignUp: true, 
				allowSignIn: false,
				email: requestFound.email,
				first_name: requestFound.first_name,
				last_name: requestFound.last_name
			})
		} else {
			res.json({allowSignUp: false})
		}
	})
});

// reset password page
router.get('/resetpassword/:token', function(req, res) {
	models.member.findOne({ where: {resetPasswordToken: req.params.token, resetPasswordExpires: { [Op.gt]: Date.now()} }})
	.then(memberFound => {
		if (memberFound) {
			res.json({
				member: memberFound,
				allowReset: true
			});
		} else {
			res.json({
				errorMsg: 'Page Expired'
			})
		}
	})
});

// the update info page
router.get('/updateinfo', function(req, res) {
	if(req.session.user) {
		models.member.findOne({where: {id: req.session.user.id}}).then(function(member) {
			res.json({user: member})
		})
		.catch(error => {console.log(error)})
	} else {
		res.json({user: ''})
	}
});

// ----------POST ROUTES----------------------

// looks if thier is an existing email, is not it creates the memeber
router.post('/signup', (req, res) => {
	models.member.findOne({where: {email: req.body.email } }).then(function(email) {
		if(email) {
			res.json({
				errorMsg: 'Email is already in use',
				allowSignIn: false
			})
		} else {
		    models.member.create({
		        first_name: req.body.first_name,
		        last_name: req.body.last_name,
		        phone_number: req.body.phone_number,
		        email: req.body.email,
		        affiliation:req.body.parish,
		        community_service: req.body.community_service,
		        password: req.body.password,
		        admin: false
		    })
		    .then(member => {
		    	if (member) {
		        	res.json({allowSignIn: true});
		        } else {
		        	res.json({allowSignIn: false});
		        }
		        sendWelcomeEmail(member);
		    })
		    .catch(error => {
		    	console.log(error.errors[0].message);
		        res.json({
		        	allowSignIn: false,
		        	errorMsg: error.errors[0].message
		        });
		    });
		}
	});	
});

// checks the email and password and signs the user in
router.post('/signin', (req, res) => {
        let email = req.body.email;
        password = req.body.password;
        models.member.findOne({ where: { email: email } }).then(function (member) {
            if (!member) {
                res.json({
                	login_status: false,
                	errorMsg: 'Your email is incorrect or cannot be found'
                });
            } else if (!member.validPassword(password)) {
                res.json({
                	login_status: false,
                	errorMsg: 'Your password is incorrect'
                });
            } else {
                req.session.user = member.dataValues;
                res.json({login_status: true});
            }
        });
});

// creates a new date along with all of the jobs and meals that need to be signed up for for that specific date
router.post('/createdate', function(req, res) {
	models.monthly_dates.create({
		date: req.body.newDate,
	})
	.then(date => {
		let jobs = [
			{
				monthlyDateId: date.id,
		    	job: 'Iced Tea Replenisher',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Iced Tea Replenisher',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Coffee/Tea Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Bread Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Food Tray Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Dessert Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Dessert Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Ticket Person',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Oven Station',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Hall Moniter/Take Home Bread',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Sink Station Dryer',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Hot Food Server',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Hot Food Server',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Hot Food Server',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: 'Salad Server',
		    	date: date.date,
		    	is_taken: false
			},
		];

		let meals = [
			{
				monthlyDateId: date.id,
		    	meal: 'Friday Bread Pickup: Judickes Bakery 7:30-7:45pm',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: 'Friday Bread Pickup: Paulantos Bakery 8:15-8:30pm',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: 'One Gallon Milk',
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: 'Two Bags Pretzels',
		    	date: date.date,
		    	is_taken: false
			},
		];
		models.weekly_jobs.bulkCreate(jobs, { individualHooks: true })
		.then(jobResult => {
			models.weekly_meals.bulkCreate(meals, { individualHooks: true })
			.then(mealResult => {res.json({newDate: date})})
			.catch(error => {console.log(error)})
		})
	})
});

// deletes the selected date as well as the meals and jobs for that date
router.post('/deletedate', function(req, res) {
	models.weekly_jobs.destroy({
		where: {monthlyDateId: req.body.id}
	})
	.then(jobResult => {
		models.weekly_meals.destroy({
			where: {monthlyDateId: req.body.id}
		})
		.then( mealResult => {
			models.monthly_dates.destroy({
				where: {id: req.body.id}
			})
			.then(dateResult => {res.json(dateResult)})
			.catch(error => {console.log(error)})
		})
	})
});

// updates jobs for memebers to sign up
router.post('/jobsignup', function(req, res) {
	models.weekly_jobs.update({
        memberId: req.body.member_ID,
        member_name: req.body.member_name,
        is_taken: true
    }, {
        where: {id: req.body.id}
    })
    .then(result => {
    	models.weekly_jobs.findOne({where: {id: req.body.id}})
    	.then(jobResult => {
    		res.json(result);
    		sendSignUpJobEmail(req.body.email, jobResult);
    	})
    	.catch(error => {console.log(error)})	
    })
});

// allows members to un-signup for jobs
router.post('/jobunsignup', function(req, res) {
	models.weekly_jobs.update({
		memberId: null,
        member_name: null,
        is_taken: false
    }, {
        where: {id: req.body.id}
    })
    .then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

// allows admins to delete a job if they want
router.post('/deletejob', function(req, res) {
	models.weekly_jobs.destroy({where: {id: req.body.id}})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

// allows memebers to sign up for meals
router.post('/mealsignup', function(req, res) {
	models.weekly_meals.update({
        memberId: req.body.member_ID,
        member_name: req.body.member_name,
        is_taken: true
    }, {
        where: {id: req.body.id}
    })
    .then(result => {
    	models.weekly_meals.findOne({where: {id: req.body.id}})
    	.then(mealResult => {
    		res.json(result);
    		sendSignUpMealEmail(req.body.email, mealResult);
    	})
    	.catch(error => {console.log(error)})	
    })
});

// allows members to un-signup for meals
router.post('/mealunsignup', function(req, res) {
	models.weekly_meals.update({
		memberId: null,
        member_name: null,
        is_taken: false
    }, {
        where: {id: req.body.id}
    })
    .then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

// allows admins to delete meals
router.post('/deletemeal', function(req, res) {
	models.weekly_meals.destroy({where: {id: req.body.id}})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

// allows admins to create new meals
router.post('/createmeal', function(req, res) {
	models.weekly_meals.create({
		monthlyDateId: req.body.date_ID,
	    meal: req.body.meal,
	    date: req.body.date,
	    is_taken: false
	})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

// route for admins to delete members and update all jobs or meals they were signed up for
router.post('/deletemember', function(req, res) {
	models.weekly_jobs.update({
		memberId: null,
		member_name: null,
		is_taken: false,
	}, {
		where: {memberId: req.body.id}
	})
	.then(jobResult => {
		models.weekly_meals.update({
		memberId: null,
		member_name: null,
		is_taken: false,
	}, {
		where: {memberId: req.body.id}
	})
	.then(mealResult => {
		models.member.destroy({where: {id: req.body.id}})
	})
	.then(memberResult => {res.json(memberResult)})
    .catch(error => {console.log(error)})
	})
});

// lets admin change others to admins or take their admin status away
router.post('/toggleadmin', function(req, res) {
	if(req.body.admin === false) {
		models.member.update({
		admin: true
	}, {
		where: {id: req.body.id}
	})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
	} else {
		models.member.update({
		admin: false
	}, {
		where: {id: req.body.id}
	})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
	}
});

// saves photos to the gallery
router.post('/savephoto', function(req, res) {
	models.gallery.create({
		photo_link: req.body.photo_link,
		likes: 0,
		dashboard: false
	})
	.then(result => {res.json(result)})
	.catch(error => {console.log(error)})
});

// deletes photos from the gallery
router.post('/deletephoto', function(req, res) {
	models.gallery.destroy({ where: {id: req.body.id}})
	.then(result => {res.json(result)})
	.catch(error => {console.log(error)})
});

// lets users update their personal info and checks for duplicate emails
router.post('/updateinfo', function(req, res) {
	models.member.findOne({where: {email: req.body.email } }).then(function(email) {
		if(email && email.id !== req.body.id) {
			res.json({errorMsg: 'Email is already in use'})
		} else {
			models.member.update({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				phone_number: req.body.phone_number,
				affiliation: req.body.affiliation,
				password: req.body.password
			}, {
				where: {id: req.body.id}
			})
			.then(result => {res.json(result)})
		    .catch(error => {res.json({errorMsg: error.errors[0].message})})
    	}
    })
});

// updates the announcement area on the dashboard
router.post('/updateannouncement', function(req, res) {
	models.announcements.destroy({where: {}})
	.then(result => {
		models.announcements.create({
			text: req.body.text
		})
		.then(announcementResult => {
			res.json(announcementResult)
		})
		.catch(error => {console.log(error)})
	})
});

// post to send the info to request to sign up
router.post('/requestsignup', function(req, res) {
	let date = new Date();
	date.setDate(date.getDate() + 7);
	crypto.randomBytes(20, (err, buf) => {
  		if (err) throw err;
  		let token = `${buf.toString('hex')}`

  		models.signup_requests.create({
  			first_name: req.body.first_name,
  			last_name: req.body.last_name,
  			email: req.body.email,
  			signUpToken: token,
  			signUpTokenExpires: date
  		})
		.then(memberRequest => {
			// console.log(memberRequest);
			sendRequestEmail(memberRequest)
			res.json({applied: true})
		})
	});	
});

// checks if there is an existing email and sends an email to change the password if there is one
router.post('/forgotpassword', function(req, res) {
	crypto.randomBytes(20, (err, buf) => {
  		if (err) throw err;
  		let token = `${buf.toString('hex')}`

  		models.member.findOne({where: {email: req.body.email}})
		.then(memberFound => {
			if(memberFound) {
				models.member.update({
					resetPasswordToken: token,
					resetPasswordExpires: Date.now() + 3600000
				}, {
					where: {id: memberFound.id}
				})
				.then(results => {
					res.json({requested: true, noEmail: false})
					sendForgotEmail(memberFound, token);
				})
				.catch(error => {console.log(error)})
			} else {
				res.json({requested: true, noEmail: true})
				console.log('No member found');
			}	
		})
	});
});

// updates the users password when forgotten
router.post('/resetpassword', function(req, res) {
	models.member.update({
		password: req.body.password
	}, {
		where: {id: req.body.member.id}
	})
	.then(result => {
		res.json({changed: true})
		sendConfirmChangeEmail(req.body.member);
	})
	.catch(error => {console.log(error)})	
});

// -------------EMAIL FUNCTIONS-------------------------

// sends the welcome email when a user signs up
function sendWelcomeEmail(newUser){
    let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: `${newUser.email}`,
      subject: `Welcome to the Bayonne Soup Kitchen!`,
      text: `Hi ${newUser.first_name}!

      Thank you for signing up for the Bayonne Soup Kitchen Website! We look forward to seeing you each Saturday.
      Make sure to keep checking back on the site for announcements, new dates for job sign up and meal sign up, and photos!

      -The Bayonne Soup Kitchen Staff`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};

// sends the request email when someone would like to sign up
function sendRequestEmail(newUserRequest){
    let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: 'thebayonnesoupkitchen@gmail.com',
      subject: `New Member Request from ${newUserRequest.first_name} ${newUserRequest.last_name}`,
      text: `${newUserRequest.first_name} ${newUserRequest.last_name} has requested to sign up for the Bayonne Soup Kitchen. 
      If approved please send the following paragragh to: ${newUserRequest.email}: 

      Hi ${newUserRequest.first_name}, 
      Your request to sign up for the Bayonne Soup Kitchen website has been approved. Please follow the link below to complete your registration. 
      This link is specific for you, please do not share it with anyone else. Note this link will expire on ${newUserRequest.signUpTokenExpires}. 
      https://bayonnesoupkitchen.com/signup/${newUserRequest.signUpToken} 

      Thank You! 
      -The Bayonne Soup Kitchen Staff`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};

// sends email with link for users to reset thier password
function sendForgotEmail(member, token){
    let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: member.email,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of your password for your Bayonne Soup Kitchen account. 
      Please click on the following link, or paste this into your browser to complete the process:
      https://bayonnesoupkitchen.com/resetpassword/${token}

      If you did not request this, please ignore this email and your password will remain unchanged.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};

// sends an email telling the user that their password has been changed
function sendConfirmChangeEmail(member){
    let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: member.email,
      subject: 'Your Password Has Been Changed',
      text: `Hello
      This is a confirmation that the password for your account ${member.email} with the Bayonne Soup Kitchen has been changed. 
      If you did not make this change please contact an Admin of the Soup Kitchen as soon as possible.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};

// sends the email when a member signs up for a job or meal
function sendSignUpJobEmail(email, info) {
	let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: email,
      subject: "You're Signed Up!",
      text: `Thanks ${info.member_name}!

      You're signed up for ${info.job} on ${info.date}. We're looking forward to seeing you there!

      -The Bayonne Soup Kitchen Staff`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};

// sends the email when a member signs up for a job or meal
function sendSignUpMealEmail(email, info) {
	let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: 'thebayonnesoupkitchen@gmail.com',
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: 'thebayonnesoupkitchen@gmail.com',
      to: email,
      subject: "You're Signed Up!",
      text: `Thanks ${info.member_name}! 

      You're signed up for ${info.meal} on ${info.date}. We're looking forward to seeing you there!

      -The Bayonne Soup Kitchen Staff`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};


module.exports = router;