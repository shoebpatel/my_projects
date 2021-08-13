const {
    Sequelize,
    DataTypes
} = require('sequelize');
const dataSource = require('./datasource.json')

const sequelize = new Sequelize(
    dataSource.DATABASE_NAME,
    dataSource.DATABASE_USER_NAME,
    dataSource.DATABASE_PASSWORD, {
        dialect: dataSource.dialect,
        host: dataSource.host,
        port: "3306"
    }, {
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = {
    sequelize,
    DataTypes
};