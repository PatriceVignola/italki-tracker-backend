// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')({
  presets: ['env'],
});

module.exports = require('./server/index.js');
