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
    weekly_meals.belongsTo(models.member, {foreignKey : 'member_ID'});
    weekly_meals.belongsTo(models.monthly_dates, {foreignKey : 'date_ID'});
  };
  return weekly_meals;
};