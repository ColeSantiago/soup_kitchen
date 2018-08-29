'use strict';
module.exports = (sequelize, DataTypes) => {
  const forum_topics = sequelize.define('forum_topics', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: {
          args: 50,
          msg: "Your title is too long"
        },
      },
    },
    message: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        max: {
          args: 3000,
          msg: "Your message is too long"
        },
      },
    },
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