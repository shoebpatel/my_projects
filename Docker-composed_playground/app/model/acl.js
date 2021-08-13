const {
	sequelize,
	DataTypes
} = require('../helper/dbsource');

const UserType = require('./usertype')

const ACL = sequelize.define('acl', {
	Id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	ApiName: {
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
	Active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	tableName: 'acl',
	timestamps: false
});

ACL.belongsTo(UserType, {
	foreignKey: 'userTypeID'
})

module.exports = ACL;