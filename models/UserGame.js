'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserGameBiodata, {
        foreignKey: 'user_game_id',
        as: 'biodata'
      })
      this.hasMany(models.UserGameHistory, {
        foreignKey: 'user_game_id',
        as: 'histories'
      })
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      })
    }
  }
  UserGame.init({
    uid: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    otp: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserGame',
    tableName: 'user_game'
  });
  return UserGame;
};