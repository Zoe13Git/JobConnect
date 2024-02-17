const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'localhost', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
