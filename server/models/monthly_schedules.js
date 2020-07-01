'use strict';

module.exports = (sequelize, DataTypes) => {
  const monthly_schedules = sequelize.define(
    'monthly_schedules',
    {
        name: DataTypes.STRING,
        month: DataTypes.INTEGER,
        is_done:{
          defaultValue: false,
          type: DataTypes.BOOLEAN
        }
    },
    
  );
  monthly_schedules.associate = function(models) {
    // associations can be defined here
    monthly_schedules.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return monthly_schedules;
};
