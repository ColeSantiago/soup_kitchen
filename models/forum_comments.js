'use strict';
module.exports = (sequelize, DataTypes) => {
  const forum_comments = sequelize.define('forum_comments', {
    forum_ID: DataTypes.INTEGER,
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
    member_ID: DataTypes.INTEGER,
    member_name: DataTypes.STRING
  }, {});
  forum_comments.associate = function(models) {
    // associations can be defined here
    forum_comments.belongsTo(models.forum_topics, {foreignKey : 'forum_ID'});
    forum_comments.belongsTo(models.member, {foreignKey : 'member_ID'});
  };
  return forum_comments;
};