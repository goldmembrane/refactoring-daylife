'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define(
    'goals',
    {
      category: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
      is_done: DataTypes.BOOLEAN
    },
    { timestamps: false }
  );
  goals.associate = function (models) {
    // associations can be defined here
    goals.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return goals;
};
