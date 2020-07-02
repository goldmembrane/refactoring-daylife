'use strict';

//const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const daily_schedules = sequelize.define(
    'daily_schedules',
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      start: DataTypes.STRING,
      end: DataTypes.STRING,
      is_done: DataTypes.BOOLEAN
    },
    {}
  );
  daily_schedules.associate = function (models) {
    // associations can be defined here
    daily_schedules.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return daily_schedules;
};
