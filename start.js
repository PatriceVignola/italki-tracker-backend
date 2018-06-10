// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')({
  presets: ['env', 'flow'],
});

module.exports = require('./src/server');
