'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    
  );
  users.associate = function(models) {
    // associations can be defined here
    models.users.hasMany(models.daily_schedules, {
      foreignKey: 'userid',
      onDelete: 'cascade'
    });
    models.users.hasMany(models.weekly_schedules, {
      foreignKey: 'userid',
      onDelete: 'cascade'
    });
    models.users.hasMany(models.monthly_schedules, {
      foreignKey: 'userid',
      onDelete: 'cascade'
    });
    models.users.hasMany(models.annually_schedules, {
      foreignKey: 'userid',
      onDelete: 'cascade'
    });
  };
  return users;
};
