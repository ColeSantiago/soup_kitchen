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
      allowNull: false,
      validate: {
        len: {
          args: [10, 10],
          msg: "Please enter a valid phone number"
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email is already in use"
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Please provide a valid email address"
        }
      },
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 100],
          msg: "Your password must be between 7 and 100 characters"
        },
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
  };
  return member;
};