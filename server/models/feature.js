module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
    });

    // Association: Each Feature belongs to a Category
    Feature.associate = (models) => {
      Feature.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category' // can do feature.category
      });
    };

    return Feature;
  };
