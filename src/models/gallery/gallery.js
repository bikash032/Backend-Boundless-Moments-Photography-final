const { DataTypes} = require("sequelize");
const sequelize = require("../../config/pg.config")

const GalleryModel = sequelize.define("gallery", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["active", "inactive"],
    defaultValue: "inactive",
  },
  category: {
    type: DataTypes.ENUM,
    values: ["landscape", "urban","nature","wildlife","weeding"],

  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
});

module.exports = GalleryModel