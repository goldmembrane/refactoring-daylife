"use strict";

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define(
    "goals",
    {
      category: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      year: DataTypes.STRING,
      day: DataTypes.STRING,
    },
    { timestamps: false }
  );
  goals.associate = function (models) {
    // associations can be defined here
    goals.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  };
  return goals;
};
