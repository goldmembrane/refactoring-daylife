'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      calendar.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
      calendar.hasMany(models.interm_check, {
        foreignKey: 'calendar_id',
        as: 'interm_checks'
      });
    }
  };
  calendar.init({
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    //start_time: DataTypes.TIME,
    end: DataTypes.DATE,
    //end_time: DataTypes.TIME,
    is_repeat: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'calendar',
  });
  return calendar;
};