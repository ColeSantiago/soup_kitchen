'use strict';
module.exports = (sequelize, DataTypes) => {
  const member_status = sequelize.define('member_status', {
    member_ID: DataTypes.INTEGER,
    online: DataTypes.BOOLEAN
  }, {});
  member_status.associate = function(models) {
    // associations can be defined here
  };
  return member_status;
};