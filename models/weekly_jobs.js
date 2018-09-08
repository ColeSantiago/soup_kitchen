'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekly_jobs = sequelize.define('weekly_jobs', {
    monthlyDateId: DataTypes.INTEGER,
    job: DataTypes.STRING,
    memberId: DataTypes.INTEGER,
    member_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    is_taken: DataTypes.BOOLEAN
  }, {});
  weekly_jobs.associate = function(models) {
    // associations can be defined here
    weekly_jobs.belongsTo(models.member, {foreignKey : 'memberId'});
    weekly_jobs.belongsTo(models.monthly_dates, {foreignKey : 'monthlyDateId'});
  };
  return weekly_jobs;
};