const {
	bcrypt,
	crypto,
	safePromise,
	Joi
} = require('../helper/require-helper');

const Token = require("../model/Token");
const User = require('../model/user');

const sendEmail = require("../utils/sendEmail");
const clientURL = process.env.CLIENT_URL;

module.exports = async (req, res) => {
	const {
		email
	} = req.body

	const data = {
		email: email
	}

	const schema = Joi.object({
		email: Joi.string().email().required()
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

	const [userErr, user] = await safePromise(User.findOne({
		where: {
			email: email
		}
	}));

	if (userErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	if (!user) {
		return res.json({
			status: 'error',
			message: 'Email does not exist'
		}).status(400)
	}

	const [tokenErr, token] = await safePromise(Token.findOne({
		where: {
			userId: user.userId
		}
	}));

	if (tokenErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	if (token) {
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
	}

	const resetToken = crypto.randomBytes(32).toString("hex");

	const hash = await bcrypt.hash(resetToken, Number(10));

	const [createErr, __token] = await safePromise(Token.create({
		userId: user.userId,
		token: hash,
		CreateDate: new Date()
	}));

	if (createErr) {
		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}

	const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user.userId}`;

	console.log('link101:: ', link);

	return sendEmail(
		user.email,
		"Password Reset Request", {
			name: user.userId,
			link: link,
		},
		"./template/requestResetPassword.handlebars",
		res
	);
}