'use strict';
let bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
    },
    parish: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 100]
      },
    },
    admin: DataTypes.BOOLEAN
  }, {
      hooks: {
        beforeCreate: (member) => {
        const salt = bcrypt.genSaltSync();
        member.password = bcrypt.hashSync(member.password, salt);
      }
    },
  });

  member.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  member.associate = function(models) {
    // associations can be defined here
    member.hasMany(models.weekly_meals);
    member.hasOne(models.weekly_jobs);
    member.hasMany(models.forum_topics);
    member.hasMany(models.forum_comments);
    member.hasOne(models.member_status);
  };
  return member;
};