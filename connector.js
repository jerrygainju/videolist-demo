const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('videos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port:'3308'
});

console.log(sequelize)

module.exports = sequelize