'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'daily_schedules'
    });
    users.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'goals'
    });
  };
  return users;
};
