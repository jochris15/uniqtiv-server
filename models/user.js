'use strict';
const { hashPassword, compareHash } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'authorId'
      })
      User.hasMany(models.Wishlist, {
        foreignKey: 'authorId'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cant be null"
        },
        notEmpty: {
          msg: "Email cant be empty"
        },
        isEmail: {
          msg: "Email must match the format"
        },
      },
      unique: {
        msg: "Email already registered"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cant be null"
        },
        notEmpty: {
          msg: "Password cant be empty"
        },
        len: {
          args: 5,
          msg: "Password minimal 5 character"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cant be null"
        },
        notEmpty: {
          msg: "Role cant be empty"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number cant be null"
        },
        notEmpty: {
          msg: "Phone number cant be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address cant be null"
        },
        notEmpty: {
          msg: "Address cant be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};