'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserGame, {
        foreignKey: 'user_game_id',
        as: 'user'
      })
    }
  }
  UserGameBiodata.init({
    user_game_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
    tableName: 'user_game_biodata'
  });
  return UserGameBiodata;
};