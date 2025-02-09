// models/question.js
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_category_junction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_content: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      timestamps: true,
    });

    // Association: A Question belongs to a CategoryUser (UserCategory)
    Question.associate = (models) => {
      Question.belongsTo(models.UserCategory, {
        foreignKey: 'user_category_junction_id',
        as: 'userCategory'
      });
    };

    return Question;
  };
