'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
    User.hasOne(models.ManufacturerProfile, { foreignKey: "userId" });

    User.hasOne(models.WorkerProfile, { foreignKey: "userId" });

    User.hasMany(models.Job, { foreignKey: "manufacturerId" });

    User.belongsToMany(models.Job, { through: models.Application, foreignKey: "workerId" });
  }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};