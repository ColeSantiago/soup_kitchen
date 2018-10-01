# Bayonne Soup Kitchen

This is a react app built for the local soup kitchen in Bayonne, NJ. While the homepage provides information about the organization and the location, the main purpose of this site is to allow members to sign up for jobs and meals each week.

This was a solo project that I built to help the Bayonne Soup Kitchen's weekly sign up process go smoother and be simple.

This site utilizes a custom made mySql database to keep track of all data. It is hosted with Heroku and has a custom domain with Google Domains. Appropriate data is encrypted.

While this site is mainly for members of the Soup Kitchen, the homepage can be viewed [here.](http://www.bayonnesoupkitchen.com) 

### Technologies Used:

*  ReactJS
*  Express
*  Node
*  mySql
*  Sequelize
*  Material Ui
*  Css
*  Axios
*  Heroku
*  many more npms that all can be found in the package.json

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_homepage.png)

## Main Usage: Job and Meal Sign up:

The most fun part about this app is the job sign up and meal sign up page.

### As a site Admin, users are able to add dates for future soup kitchen days.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_dates.png)

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_calender.png)

When a date is added, all jobs and meals that are needed are created and shown when that date is selected.

Users are able to view all jobs and meals that are needed and can choose to sign up for them.

When signed up for, the job or meal will move to the correct side of the page and users will receieve a confirmation email.

Users can un-sign up if they choose to as well.

### As an Admin, users can choose to delete any job or meal, and can unassign a job from another member.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_job_signup.png)

### As meals can change weekly, Admins are able to add as many new meals as they like.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_meal_signup.png)

##  Other Site Features

### To control who can sign up for this website users are required to request to sign up.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_request.png)

#### A special link is created for this user that will expire, and if approved the Soup Kitchen can choose to send this link to the potential member.

Users can then sign up and are directed to sign in.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_signup.png)

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_sign_in.png)

## The dashboard will show different information for admins and regular users.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_dashboard.png)

## Gallery

Admins can upload and delete photos to the gallery, anyone is able to view it.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_gallery.png)

## Update Info

Everyone is able to update any of their info.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_update.png)

## Member page

There is a page specifically for admins that will list out all of the members with thier info.

Here there are options to delete members or toggle thier admin status.

## Forgot Password

The forgot password page will generate a link that expires for the user and email it to them with appropriate instructions.

![homepage](https://raw.githubusercontent.com/ColeSantiago/soup_kitchen/master/read_me_photos/soup_kitchen_forgot.png)

