const { DataTypes} = require("sequelize");
const sequelize = require("../../config/pg.config")

const MessageModel = sequelize.define("clientmessages", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  subject: {
    type: DataTypes.STRING
  },
  inqueryType: {
    type: DataTypes.ENUM,
    values:["general","booking","collaboration","pricing","other"]
  },
  message: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue:Date.now()
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue:Date.now()
  }
});

module.exports = MessageModel