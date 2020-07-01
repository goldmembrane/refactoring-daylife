'use strict';

module.exports = (sequelize, DataTypes) => {
  const annually_schedules = sequelize.define(
    'annually_schedules',
    {
        name: DataTypes.STRING,
        year: DataTypes.INTEGER,
        is_done: {
          defaultValue: false,
          type: DataTypes.BOOLEAN
        }
    },
    
  );
  annually_schedules.associate = function(models) {
    // associations can be defined here
    annually_schedules.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return annually_schedules;
};
