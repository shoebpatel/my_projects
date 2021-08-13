const {
	sequelize,
	DataTypes
} = require('../helper/dbsource');

const UserType = require('./usertype')

const User = sequelize.define('user', {
	userId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	userTypeID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user_type',
			key: 'userTypeID',
		}
	},
	CreateDate: {
		type: DataTypes.DATE,
		allowNull: false
	},
	UpdateDate: {
		type: DataTypes.DATE,
		allowNull: false
	},
	Active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	tableName: 'users',
	timestamps: false
});

User.belongsTo(UserType, {
	foreignKey: 'userTypeID'
})

module.exports = User;