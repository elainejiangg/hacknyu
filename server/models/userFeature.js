// models/userFeature.js
module.exports = (sequelize, DataTypes) => {
    const UserFeature = sequelize.define('UserFeature', {
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
      feature_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      experience: {
        type: DataTypes.FLOAT, // Numeric score for experience
        defaultValue: 0, // Default value is 0
        allowNull: false
      }
    }, {
      timestamps: false,
    });

    // Associations: A UserFeature belongs to both CategoryUser and Feature
    UserFeature.associate = (models) => {
      UserFeature.belongsTo(models.UserCategory, {
        foreignKey: 'user_category_junction_id',
        as: 'userCategory'
      });
      UserFeature.belongsTo(models.Feature, {
        foreignKey: 'feature_id',
        as: 'feature'
      });
    };

    return UserFeature;
  };
