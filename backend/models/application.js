'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Application.belongsTo(models.Job, { foreignKey: "jobId" });
  Application.belongsTo(models.User, { foreignKey: "workerId" });
    }
  }
  Application.init({
    jobId: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};