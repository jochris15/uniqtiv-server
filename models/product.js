'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      Product.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Product.hasMany(models.History, {
        foreignKey: 'productId'
      })
      Product.hasMany(models.Wishlist, {
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cant be null"
        },
        notEmpty: {
          msg: "Price cant be empty"
        },
        min: {
          args: 50000,
          msg: "Price minimal Rp. 50,000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock cant be null"
        },
        notEmpty: {
          msg: "Stock cant be empty"
        },
        min: {
          args: 1,
          msg: "Stock minimal 1"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Img Url cant be null"
        },
        notEmpty: {
          msg: "Img Url cant be empty"
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
    authorId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isStatus() {
          if (this.status !== "active" && this.status !== "inactive" && this.status !== "archived") {
            throw new Error('Status can only become active / inactive / archived')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};