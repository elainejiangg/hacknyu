// models/categoryUser.js
module.exports = (sequelize, DataTypes) => {
    const UserCategory = sequelize.define('UserCategory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Default experience is 0
        allowNull: false
      }
    }, {
      timestamps: false,
    });

    // Association: A CategoryUser belongs to a User and a Category
    UserCategory.associate = (models) => {
        UserCategory.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      UserCategory.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
    };

    return UserCategory;
  };
