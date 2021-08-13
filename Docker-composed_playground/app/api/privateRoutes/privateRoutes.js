const express = require('express');
const router = express.Router();
const validateAuthorization = require('../../middleware/authorization');
const {
    fetch,
    safePromise
} = require('../../helper/require-helper');
const {
    RESOURCE_URL_PRIVATE
} = require('../../helper/constants.json');
const {
    AUTHORIZATION
} = require('../../helper/secret.json');


// * REST Api to get User data
router.get('/getUserData', validateAuthorization, async (req, res) => {
    console.log('user route!!!!!!');
    let [singnUpErr, singnUpRes] = await safePromise(fetch(`${RESOURCE_URL_PRIVATE}/getUserData/${req.user.userId}`, {
        method: 'GET',
        headers: {
            'Authorization': AUTHORIZATION
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

    console.log('result101: ', result);

    res.json(result).status(200);
});

// * REST Api to get Admin data
router.get('/admin', validateAuthorization, async (req, res) => {
    console.log('admin route!!!!!!');
    let [singnUpErr, singnUpRes] = await safePromise(fetch(`${RESOURCE_URL_PRIVATE}/admin`, {
        method: 'GET',
        headers: {
            'Authorization': AUTHORIZATION
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

    console.log('result101: ', result);

    res.json(result).status(200);
});

// * REST Api to get Owner data
router.get('/owner', validateAuthorization, async (req, res) => {
    let [singnUpErr, singnUpRes] = await safePromise(fetch(`${RESOURCE_URL_PRIVATE}/owner`, {
        method: 'GET',
        headers: {
            'Authorization': AUTHORIZATION
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

    console.log('result101: ', result);

    res.json(result).status(200);

});

module.exports = router;