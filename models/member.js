'use strict';
module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    email: DataTypes.STRING,
    parish: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  member.associate = function(models) {
    // associations can be defined here
    member.hasMany(models.weekly_meals);
    member.hasOne(models.weekly_jobs);
    member.hasMany(models.forum_topics);
    member.hasMany(models.forum_comments);
    member.hasOne(models.member_status);
  };
  return member;
};