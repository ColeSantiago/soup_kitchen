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
  };
  return member;
};