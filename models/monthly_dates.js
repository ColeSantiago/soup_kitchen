'use strict';
module.exports = (sequelize, DataTypes) => {
  const monthly_dates = sequelize.define('monthly_dates', {
    date: DataTypes.DATEONLY,
    month: DataTypes.STRING
  }, {});
  monthly_dates.associate = function(models) {
    // associations can be defined here
    monthly_dates.hasMany(models.weekly_meals);
    monthly_dates.hasMany(models.weekly_jobs);
  };
  return monthly_dates;
};