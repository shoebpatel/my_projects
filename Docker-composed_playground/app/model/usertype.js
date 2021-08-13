const {sequelize,DataTypes} = require('../helper/dbsource');

const UserType = sequelize.define('user_type', {
    userTypeID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    Description: DataTypes.STRING
}, {
    tableName: 'user_type',
    timestamps: false
});

module.exports = UserType;