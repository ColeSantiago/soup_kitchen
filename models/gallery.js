'use strict';
module.exports = (sequelize, DataTypes) => {
  const gallery = sequelize.define('gallery', {
    photo_link: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dashboard: DataTypes.BOOLEAN
  }, {});
  gallery.associate = function(models) {
    // associations can be defined here
  };
  return gallery;
};