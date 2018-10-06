const Sequelize = require('sequelize');
const MessageModel = require('./models/message');

const database = "database";
const username = "postgres";
const password = process.env.POSTGRES_PASSWORD; 

const sequelize = new Sequelize(database, username, password, {
    host: "postgres",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => { console.log('Database connection has been successfully established!'); })
    .catch(err => { console.log('Unable to connect to the database: ', err)});

const Message = MessageModel(sequelize, Sequelize);

sequelize
    .sync()
    .then(() => { console.log('Models synced and tables ready!'); })
    .catch(() => { console.log('Error syncing models')});

module.exports = {
    Message
}
