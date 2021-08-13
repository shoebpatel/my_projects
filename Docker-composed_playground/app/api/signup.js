const {
	fetch,
	safePromise
} = require('../helper/require-helper');
const {
	RESOURCE_URL
} = require('../helper/constants.json')
const {
    AUTHORIZATION
} = require('../helper/secret.json')

module.exports = async (req, res) => {
	console.log('Incoming Request::');
	try {
		let [singnUpErr, singnUpRes] = await safePromise(fetch(`${RESOURCE_URL}/signup`, {
			method: 'POST',
			body: JSON.stringify(req.body),
			headers: {
				'authorization': AUTHORIZATION,
				'Content-Type': 'application/json'
			}
		}))

		if (singnUpErr) {
			console.log('singnUpErr: ', singnUpErr);
			return res.json({
				status: 'error',
				message: 'Something went wrong'
			}).status(500)
		}

		let [error, result] = await safePromise(singnUpRes.json());

		if (error) {
			console.log('message: ', error);
			return res.json({
				status: 'error',
				message: 'Something went wrong'
			}).status(500)
		}

		console.log('result: ', result);

		res.json(result)
	} catch (error) {
		console.log('error102: ', error);

		return res.json({
			status: 'error',
			message: 'Something went wrong'
		}).status(500)
	}
}