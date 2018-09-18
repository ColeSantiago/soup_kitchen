'use strict';
module.exports = (sequelize, DataTypes) => {
  const signup_requests = sequelize.define('signup_requests', {
  	first_name: DataTypes.STRING,
  	last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    signUpToken: DataTypes.STRING,
    signUpTokenExpires: DataTypes.DATE
  }, {});
  signup_requests.associate = function(models) {
    // associations can be defined here
  };
  return signup_requests;
};