'use strict';
module.exports = (sequelize, DataTypes) => {
  const monthly_dates = sequelize.define('monthly_dates', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  monthly_dates.associate = function(models) {
    // associations can be defined here
    monthly_dates.hasMany(models.weekly_meals);
    monthly_dates.hasMany(models.weekly_jobs);
  };
  return monthly_dates;
};