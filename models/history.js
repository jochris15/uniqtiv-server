'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  History.init({
    productId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cant be null"
        },
        notEmpty: {
          msg: "Name cant be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cant be null"
        },
        notEmpty: {
          msg: "Description cant be empty"
        }
      }
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "updatedBy cant be null"
        },
        notEmpty: {
          msg: "updatedBy cant be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};