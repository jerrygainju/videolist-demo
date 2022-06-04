const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize =require('../connector')
const Video = sequelize.define("video", {
    id:{type: Sequelize.INTEGER,
    allowNull: false, autoIncrement: true, primaryKey: true},
    name:{type: Sequelize.STRING},
    description:{type: Sequelize.TEXT},
    active: {type: Sequelize.BOOLEAN}
});

module.exports = Video;