'use strict';
module.exports = (sequelize, DataTypes) => {
  const monthly_dates = sequelize.define('monthly_dates', {
    date: DataTypes.DATEONLY,
    month: DataTypes.STRING
  }, {});
  monthly_dates.associate = function(models) {
    // associations can be defined here
  };
  return monthly_dates;
};