// models/questionPart.js
module.exports = (sequelize, DataTypes) => {
    const QuestionPart = sequelize.define('QuestionPart', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      feature_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_suspicious: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_answered_suspicious: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    }, {
      timestamps: true,
    });

    // Associations: A QuestionPart belongs to a Feature
    QuestionPart.associate = (models) => {
      QuestionPart.belongsTo(models.Feature, {
        foreignKey: 'feature_id',
        as: 'feature'
      });
    };

    return QuestionPart;
  };
