const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../connector')

const VideoListItem = sequelize.define("videolistitem", {
    id:  {type: Sequelize.INTEGER, 
    allowNull: false, autoIncrement: true, primaryKey: true},
});

module.exports = VideoListItem;