// Load base config
var prodConfig = require('./config-development');

// Start making changes for production.
// We recommend to access properties directly as shown below and
// not assigning whole objects.

prodConfig.styles.options.stylus.cache = false;
prodConfig.styles.options.stylus.compress = true;
prodConfig.styles.options.stylus.sourcemap = false;

module.exports = prodConfig;
