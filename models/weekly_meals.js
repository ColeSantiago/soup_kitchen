'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekly_meals = sequelize.define('weekly_meals', {
    monthlyDateId: DataTypes.INTEGER,
    meal: DataTypes.STRING,
    memberId: DataTypes.INTEGER,
    member_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    is_taken: DataTypes.BOOLEAN
  }, {});
  weekly_meals.associate = function(models) {
    // associations can be defined here
    weekly_meals.belongsTo(models.member, {foreignKey : 'memberId'});
    weekly_meals.belongsTo(models.monthly_dates, {foreignKey : 'monthlyDateId'});
  };
  return weekly_meals;
};