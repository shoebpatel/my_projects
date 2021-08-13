const {
	sequelize,
	DataTypes
} = require('../helper/dbsource');

const User = require('./user')

const Token = sequelize.define('token', {
	Id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user',
			key: 'userId',
		}
	},
	token: {
		type: DataTypes.STRING,
        allowNull: false
	},
	CreateDate: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	tableName: 'token',
	timestamps: false
});

Token.belongsTo(User, {
	foreignKey: 'userId'
})

module.exports = Token;