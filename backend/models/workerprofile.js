'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkerProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkerProfile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    skills: {
        type: DataTypes.TEXT
      },
      work_type: {
        type: DataTypes.STRING
      },
      experience_years: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'WorkerProfile',
     tableName: 'WorkerProfiles',
      timestamps: true 
  });
  return WorkerProfile;
};