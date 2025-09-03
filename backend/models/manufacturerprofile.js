'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManufacturerProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ManufacturerProfile.init({
    factory_name: {
        type: DataTypes.STRING
      },
      machinery: {
        type: DataTypes.TEXT
      },
      daily_capacity: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'ManufacturerProfile',
    tableName: 'ManufacturerProfiles',
    timestamps: true
  });
  return ManufacturerProfile;
};