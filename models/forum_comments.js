'use strict';
module.exports = (sequelize, DataTypes) => {
  const forum_comments = sequelize.define('forum_comments', {
    forumId: DataTypes.INTEGER,
    comment: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        max: {
          args: 400,
          msg: "Your comment cannot exceed 400 characters"
        },
      },
    }, 
    memberId: DataTypes.INTEGER,
    member_name: DataTypes.STRING
  }, {});
  forum_comments.associate = function(models) {
    // associations can be defined here
    forum_comments.belongsTo(models.forum_topics, {foreignKey : 'forumId'});
    forum_comments.belongsTo(models.member, {foreignKey : 'memberId'});
  };
  return forum_comments;
};