const {
	bcrypt,
	safePromise,
	Joi
} = require('../helper/require-helper');

const Token = require("../model/Token");
const User = require('../model/user');

module.exports = async (req, res) => {
	const {
		plainTextPassword
	} = req.body

	const data = {
		password: plainTextPassword
	}

	const schema = Joi.object({
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

	if (!req.query.id || !req.query.token) {
		return res.json({
			status: 'error',
			message: 'missing query parameters'
		}).status(500)
	}

	const [tokenErr, passwordResetToken] = await safePromise(Token.findOne({
		where: {
			userId: req.query.id
		}
	}));

	if (tokenErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	if (!passwordResetToken) {
		return res.json({
			status: 'error',
			message: "Invalid or expired password reset token"
		});
	}

	const isValid = await bcrypt.compare(req.query.token, passwordResetToken.token);

	if (!isValid) {
		return res.json({
			status: 'error',
			message: "Invalid or expired password reset token"
		});
	}

	const hash = await bcrypt.hash(plainTextPassword, Number(10));

	const [userErr, user] = await safePromise(User.findOne({
		where: {
			userId: req.query.id
		}
	}));

	if (userErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	user.update({
		password: hash
	})

	const [deleteErr, __token] = await safePromise(Token.destroy({
		where: {
			userId: user.userId
		}
	}));

	if (deleteErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	return res.json({
		status: 'success',
		message: "Password reset successfully"
	}).status(200)
}