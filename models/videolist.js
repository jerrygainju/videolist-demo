const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../connector')

const VideoList = sequelize.define("videolist", {
    id:  {type: Sequelize.INTEGER, 
    allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.STRING},
    link: {type: Sequelize.STRING},
});

module.exports = VideoList;