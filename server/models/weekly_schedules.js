'use strict';

module.exports = (sequelize, DataTypes) => {
  const weekly_schedules = sequelize.define(
    'weekly_schedules',
    {
        name: DataTypes.STRING,
        month: DataTypes.INTEGER,
        week: DataTypes.INTEGER,
        is_done: {
          defaultValue: false,
          type: DataTypes.BOOLEAN
        }
    },
    
  );
  weekly_schedules.associate = function(models) {
    // associations can be defined here
    weekly_schedules.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return weekly_schedules;
};
