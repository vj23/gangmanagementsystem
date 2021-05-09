'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  task.init({
    incharge: DataTypes.STRING,
    section: DataTypes.STRING,
    gang: DataTypes.STRING,
    task: DataTypes.STRING,
    compliance: DataTypes.STRING,
    grievance: DataTypes.STRING,
    contractual: DataTypes.STRING,
    machine: DataTypes.STRING,
    updatedDt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};