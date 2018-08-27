'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekly_jobs = sequelize.define('weekly_jobs', {
    date_ID: DataTypes.INTEGER,
    job: DataTypes.STRING,
    member_ID: DataTypes.INTEGER,
    member_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    is_taken: DataTypes.BOOLEAN
  }, {});
  weekly_jobs.associate = function(models) {
    // associations can be defined here
  };
  return weekly_jobs;
};