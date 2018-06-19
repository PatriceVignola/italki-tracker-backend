// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-polyfill');
// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')();

module.exports = require('./src/server');
