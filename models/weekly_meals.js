'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekly_meals = sequelize.define('weekly_meals', {
    date_ID: DataTypes.INTEGER,
    meal: DataTypes.STRING,
    member_ID: DataTypes.INTEGER,
    member_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    is_taken: DataTypes.BOOLEAN
  }, {});
  weekly_meals.associate = function(models) {
    // associations can be defined here
  };
  return weekly_meals;
};