'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.hasMany(models.Question, { foreignKey: 'QuestionId' })
      // define association here
    }
  };
  Answer.init({
    answer: DataTypes.STRING,
    point: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};