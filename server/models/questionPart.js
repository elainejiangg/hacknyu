// models/questionPart.js
module.exports = (sequelize, DataTypes) => {
    const QuestionPart = sequelize.define('QuestionPart', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowedNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowedNull: false,
      },
      question_part_content: {
        type: DataTypes.STRING,
        allowedNull: false,
      },
      is_suspicious: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_answered_suspicious: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    }, {
      timestamps: true,
    });

    // Associations: A QuestionPart belongs to a Feature
    QuestionPart.associate = (models) => {
      QuestionPart.belongsTo(models.Question, {
        foreignKey: 'question_id',
        as: 'question'
      })
    };

    return QuestionPart;
  };
