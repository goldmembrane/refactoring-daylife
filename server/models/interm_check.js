'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class interm_check extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      calendar.belongsTo(models.calendar, {
        foreignKey: 'calendar_id',
      });
    }
  };
  interm_check.init({
    alarm_time: DataTypes.TIME,
    alarm_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'interm_check',
  });
  return interm_check;
};