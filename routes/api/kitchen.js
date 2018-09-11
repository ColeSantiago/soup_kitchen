const axios = require("axios");
const router = require("express").Router();
const models = require("../../models/index.js");
const nodemailer = require("nodemailer");

// route for member signup
router.get('/signup', (req, res) => {
	if(req.session.user && req.cookies.user_cole) {
        res.json({allowSignIn: true});
	}
});

router.post(`/signup/${process.env.REACT_APP_SIGNUP_TOKEN}`, (req, res) => {
	models.member.findOne({where: {email: req.body.email } }).then(function(email) {
		if(email) {
			res.json({
				errorMsg: "Email is already in use",
				allowSignIn: false
			})
		} else {
		    models.member.create({
		        first_name: req.body.first_name,
		        last_name: req.body.last_name,
		        phone_number: req.body.phone_number,
		        email: req.body.email,
		        affiliation:req.body.parish,
		        password: req.body.password,
		        admin: false
		    })
		    .then(member => {
		    	if (member) {
		        	res.json({allowSignIn: true});
		        } else {
		        	res.json({allowSignIn: false});
		        }
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

// route for member Login
router.get('/signin', (req, res) => {
	if(req.session.user && req.cookies.user_cole) {
        res.json({login_status: true});
	}
});

router.post("/signin", (req, res) => {
        let email = req.body.email;
        password = req.body.password;
        models.member.findOne({ where: { email: email } }).then(function (member) {
            if (!member) {
                res.json({
                	login_status: false,
                	errorMsg: "Your email is incorrect or cannot be found"
                });
            } else if (!member.validPassword(password)) {
                res.json({
                	login_status: false,
                	errorMsg: "Your password is incorrect"
                });
            } else {
                req.session.user = member.dataValues;
                res.json({login_status: true});
            }
        });
});

// route for member logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_cole) {
        res.clearCookie('user_cole');
        res.json({login_status: false});
    } else {
        res.json({login_status: false});
    }
});


// route for member's dashboard
router.get('/dashboard', function(req, res) {
    if (req.session.user && req.cookies.user_cole) {
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

router.post('/createdate', function(req, res) {
	models.monthly_dates.create({
		date: req.body.newDate,
	})
	.then(date => {
		let jobs = [
			{
				monthlyDateId: date.id,
		    	job: "Iced Tea Replenisher",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Iced Tea Replenisher",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Coffee/Tea Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Bread Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Food Tray Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Dessert Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Dessert Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Ticket Person",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Oven Station",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Hall Moniter/Take Home Bread",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Sink Station Dryer",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Hot Food Server",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Hot Food Server",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Hot Food Server",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	job: "Salad Server",
		    	date: date.date,
		    	is_taken: false
			},
		];

		let meals = [
			{
				monthlyDateId: date.id,
		    	meal: "Friday Bread Pickup: Judickes Bakery 7:30-7:45pm",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: "Friday Bread Pickup: Paulantos Bakery 8:15-8:30pm",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: "Saturday Bread Pickup: Vincent & Antonio's Bakery 2:30pm",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: "One Gallon Milk",
		    	date: date.date,
		    	is_taken: false
			},
			{
				monthlyDateId: date.id,
		    	meal: "Two Bags Pretzels",
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

router.get('/jobsignup/date/:id', function(req, res) {
	if (req.session.user && req.cookies.user_cole) {
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
	} else {
        res.json({login_status: false});
    }
});

router.post('/jobsignup', function(req, res) {
	models.weekly_jobs.update({
        memberId: req.body.member_ID,
        member_name: req.body.member_name,
        is_taken: true
    }, {
        where: {id: req.body.id}
    })
    .then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

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

router.post('/deletejob', function(req, res) {
	models.weekly_jobs.destroy({where: {id: req.body.id}})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

router.post('/mealsignup', function(req, res) {
	models.weekly_meals.update({
        memberId: req.body.member_ID,
        member_name: req.body.member_name,
        is_taken: true
    }, {
        where: {id: req.body.id}
    })
    .then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

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

router.post('/deletemeal', function(req, res) {
	models.weekly_meals.destroy({where: {id: req.body.id}})
	.then(result => {res.json(result)})
    .catch(error => {console.log(error)})
});

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

router.get('/memberpage', function(req, res) {
	if (req.session.user && req.cookies.user_cole && req.session.user.admin) {
		models.member.findAll()
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

router.get('/gallery', function(req, res) {
	models.gallery.findAll()
	.then(galleryResult => {
		res.json({
			gallery: galleryResult,
			user: req.session.user
		})
	})
	.catch(error => {console.log(error)})
});

router.post('/savephoto', function(req, res) {
	models.gallery.create({
		photo_link: req.body.photo_link,
		likes: 0,
		dashboard: false
	})
	.then(result => {res.json(result)})
	.catch(error => {console.log(error)})
});

router.post('/deletephoto', function(req, res) {
	models.gallery.destroy({ where: {id: req.body.id}})
	.then(result => {res.json(result)})
	.catch(error => {console.log(error)})
});

router.get('/updateinfo', function(req, res) {
	models.member.findOne({where: {id: req.session.user.id}}).then(function(member) {
		res.json({user: member})
	})
	.catch(error => {console.log(error)})
});

router.post('/updateinfo', function(req, res) {
	models.member.findOne({where: {email: req.body.email } }).then(function(email) {
		if(email && email.id !== req.body.id) {
			res.json({
				errorMsg: "Email is already in use"
			})
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

router.post('/updateannouncement', function(req, res) {
	console.log(req.body)
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

router.post('/requestsignup', function(req, res) {
	sendRequestEmail(req.body)
	res.json({applied: true})
});

function sendRequestEmail(newUserRequest){
    let transporter = nodemailer.createTransport({
      	host: 'smtp.gmail.com',
      	auth: {
      		type: 'OAuth2',
	        user: "thebayonnesoupkitchen@gmail.com",
	        clientId: process.env.REACT_API_CLIENT_ID,
	        clientSecret: process.env.REACT_API_SECRET,
	        refreshToken: process.env.REACT_API_REFRESH_TOKEN,
	        accessToken: process.env.REACT_API_ACCESS_TOKEN
      	}
    });

    let mailOptions = {
      from: "thebayonnesoupkitchen@gmail.com",
      to: "thebayonnesoupkitchen@gmail.com",
      subject: `New Member Request from ${newUserRequest.first_name} ${newUserRequest.last_name}`,
      text: `${newUserRequest.first_name} ${newUserRequest.last_name} has requested to sign up for the Bayonne Soup Kitchen.
      		If approved please send sign up email to: ${newUserRequest.email}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
    });
};


module.exports = router;