const User = require('../model/user');
const {
	Joi,
	bcrypt,
	jwt
} = require('../helper/require-helper');

const {
	JWT_SECRET
} = require('../helper/secret.json');

module.exports = async (req, res) => {
	console.log('Incoming Request::');

	const {
		email,
		plainTextPassword
	} = req.body

	const data = {
		email: email,
		password: plainTextPassword
	}

	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});

	const {
		error,
		value
	} = schema.validate(data, {
		stripUnknown: true
	})

	console.log('value: ', value);

	if (error) {
		console.log('error101: ', JSON.stringify(error));

		const err = error && error.details && error.details[0] && error.details[0].message ? error.details[0].message : 'Something went wrong';

		return res.json({
			status: 'error',
			message: err
		}).status(500)
	}

	const user = await User.findOne({
		where: {
			email
		}
	})

	if (!user) {
		return res.json({
			status: 'error',
			message: 'Invalid email/password'
		}).status(400)
	}

	// * comparing the hash passwords
	if (await bcrypt.compare(plainTextPassword, user.password)) {
		const token = jwt.sign({
				userId: user.userId,
				userTypeID: user.userTypeID,
				email: user.email
			},
			JWT_SECRET
		)

		return res.json({
			status: 'success',
			token: token,
			userId: user.userId
		}).status(200)
	}

	res.json({
		status: 'error',
		message: 'Invalid username/password'
	}).status(400)
}