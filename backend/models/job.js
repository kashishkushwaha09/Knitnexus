'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Job.belongsTo(models.User, { foreignKey: "manufacturerId" });
  Job.belongsToMany(models.User, { through: models.Application, foreignKey: "jobId" });


    }
  }
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.STRING,
    pay_per_day: DataTypes.INTEGER,
    manufacturerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};