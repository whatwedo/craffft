// Load base config
var prodConfig = require('./config-development');

// Start making changes for production.
// We recommend to access properties directly as shown below and
// not assigning whole objects.

prodConfig.stylus.options.cache = false;
prodConfig.stylus.options.compress = true;
prodConfig.stylus.options.sourcemap = false;

module.exports = prodConfig;
