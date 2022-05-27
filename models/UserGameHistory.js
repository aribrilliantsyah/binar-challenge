'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
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
  UserGameHistory.init({
    user_game_id: DataTypes.INTEGER,
    score: DataTypes.DOUBLE,
    start_at: DataTypes.DATE,
    end_at: DataTypes.DATE,
    playtime: DataTypes.TIME,
    link_video: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserGameHistory',
    tableName: 'user_game_history'
  });
  return UserGameHistory;
};