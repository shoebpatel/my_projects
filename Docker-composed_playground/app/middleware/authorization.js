const ACL = require('../model/acl');
const {
    jwt,
    safePromise
} = require('../helper/require-helper');

const {
    JWT_SECRET
} = require('../helper/secret.json');

module.exports = async (req, res, next) => {
    console.log('req.headers.authorization:: ', req.headers.authorization);
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).send("Access Denied");
    }

    token = req.headers.authorization.replace("Bearer ", "");

    console.log('token:: ', token);

    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log('user: ', user);

        let req_url = req.route.path;

        console.log('req_url: ', req_url);

        // * Check authorization 
        const [err, acl] = await safePromise(ACL.findOne({
            where: {
                userTypeID: user.userTypeID,
                ApiName: req_url,
                Active: 1
            }
        }))

        if (err) {
            console.log('err: ', err);
            return res.json({
                status: 'error',
                message: 'Something went wrong'
            }).status(500)
        }

        if (!acl) {
            return res.status(401).send("Unauthorized!");
        }

        console.log('Authorized!!!')

        req.user = user;
        next();
    } catch (error) {
        console.log('Error:: ', error)
        return res.status(302).redirect("/login.html");
    }
}