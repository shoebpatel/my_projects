const _ = require("underscore");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { sequelize } = require('../helper/dbsource');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const crypto = require("crypto");

const safePromise = promise => promise.then(data => ([null, data])).catch(err => ([err]));

module.exports._ = _;
module.exports.Joi = Joi;
module.exports.bcrypt = bcrypt;
module.exports.sequelize = sequelize;
module.exports.safePromise = safePromise;
module.exports.jwt = jwt;
module.exports.fetch = fetch;
module.exports.crypto = crypto;
