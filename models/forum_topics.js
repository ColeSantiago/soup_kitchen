'use strict';
module.exports = (sequelize, DataTypes) => {
  const forum_topics = sequelize.define('forum_topics', {
    title: DataTypes.STRING,
    message: DataTypes.BLOB,
    member_ID: DataTypes.INTEGER,
    member_name: DataTypes.STRING
  }, {});
  forum_topics.associate = function(models) {
    // associations can be defined here
    forum_topics.belongsTo(models.member, {foreignKey : 'member_ID'});
    forum_topics.hasMany(models.forum_comments);
  };
  return forum_topics;
};