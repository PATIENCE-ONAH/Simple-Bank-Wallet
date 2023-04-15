const Sequelize  = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()
const sequelize = new Sequelize('savings','root','ifypat',{dialect:'mysql', host:'localhost'});
// const sequelize = new Sequelize(process.env.DATABASE,process.env.DATABASE_USER, 'ifypat',
// {dialect:'mysql', host:'localhost'});


module.exports = sequelize
