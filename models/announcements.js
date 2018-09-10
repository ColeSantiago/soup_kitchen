'use strict';
module.exports = (sequelize, DataTypes) => {
  const announcements = sequelize.define('announcements', {
    photo_link: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  announcements.associate = function(models) {
    // associations can be defined here
  };
  return announcements;
};