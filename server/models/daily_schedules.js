'use strict';

module.exports = (sequelize, DataTypes) => {
  const daily_schedules = sequelize.define(
    'daily_schedules',
    {
        name: DataTypes.STRING,
        start: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        end: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        is_done: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
    },
    
  );
  daily_schedules.associate = function(models) {
    // associations can be defined here
    daily_schedules.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false
      }
    });
    models.daily_schedules.hasMany(models.interm_checks, {
      foreignKey: 'calendar_id',
      onDelete: 'cascade'
    });
  };
  return daily_schedules;
};
