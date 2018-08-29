const axios = require("axios");
const router = require("express").Router();
const models = require("../../models/index.js");
const nodemailer = require("nodemailer");

let sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_cole) {
        console.log(req.session.user)
        console.log(req.cookies.user_cole)
    } else {
        next();
    }    
};

// router.get('/', sessionChecker, (req, res) => {
//     res.redirect('/login');
// });

// route for member signup
router.get('/signup', (req, res) => {
	if(req.session.user && req.cookies.user_cole) {
        res.json({allowSignIn: true});
	}
});

router.post('/signup', (req, res) => {
        models.member.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            parish:req.body.parish,
            password: req.body.password
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


// route for member's dashboard
router.get('/dashboard', function(req, res) {
    if (req.session.user && req.cookies.user_cole) {
        res.json({login_status: true})
    } else {
        res.json({login_status: false});
    }
});


// route for member logout
// router.get('/logout', (req, res) => {
//     if (req.session.member && req.cookies.member_cole) {
//         res.clearCookie('member_cole');
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });

module.exports = router;