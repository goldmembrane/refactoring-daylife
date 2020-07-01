'use strict';

module.exports = (sequelize, DataTypes) => {
  const interm_checks = sequelize.define(
    'interm_checks',
    {
        alarm_time: DataTypes.DATETIME
    },
    
  );
  interm_checks.associate = function(models) {
    // associations can be defined here
    interm_checks.belongsTo(models.daily_schedules, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return interm_checks;
};
