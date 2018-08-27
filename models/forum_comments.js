'use strict';
module.exports = (sequelize, DataTypes) => {
  const forum_comments = sequelize.define('forum_comments', {
    forum_ID: DataTypes.INTEGER,
    comment: DataTypes.BLOB,
    member_ID: DataTypes.INTEGER,
    member_name: DataTypes.STRING
  }, {});
  forum_comments.associate = function(models) {
    // associations can be defined here
  };
  return forum_comments;
};