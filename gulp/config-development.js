var packageConfig = require('../package.json');

var dest = './dist/wp-content/themes/' + packageConfig.name;
var src = './src';

var bowerComponents = './bower_components';
var nodeModules = './node_modules';

module.exports = {
  src: src,
  options: {
    version: packageConfig.version
  },
  autoprefixer: {
    options: {
      browsers: [
      'last 2 version',
      'safari 5',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
      ]
    }
  },
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest]
    },
    open: false,
    files: [
      dest + '/**',
      // Exclude Map files
      '!' + dest + '/**.map'
    ]
  },
  postcss: {
    src: src + '/**/*.css',
    dest: dest,
    processors: [
      'autoprefixer',
      'css-mqpacker',
      'postcss-import'    // Combines media queries
      // 'csswring'       // Minifies CSS
    ]
  },
  stylus: {
    src: [
      src + '/**/*.{stylus,styl}',
      src + '/**/!(_*.styl|_*.stylus)'
    ],
    dest: dest,
    options: {
      compress: false,
      include: [
        bowerComponents + '/../', // Shortcut references possible everywhere, e.g. @import 'bower_components/bla'
        nodeModules + '/../'      // Shortcut references possible everywhere, e.g. @import 'node_modules/bla'
      ]
    }
  },
  // See: https://github.com/sindresorhus/gulp-imagemin
  images: {
    src: src + '/resources/images/**',
    dest: dest + '/resources/images',
    options: {
      optimizationLevel: 3, // (png) 0 - 7 trials
      progressive: true,    // (jpg) Lossless conversion to progressive
      interlaced: true,     // (gif) Interlace gif for progressive rendering
      multipass: false,     // (svg) Optimize svg multiple times until it's fully optimized.
      svgoPlugins: [],      // (svg) Plugins
      use: [                // Additional Plugins
        'imagemin-pngquant'
      ]
    }
  },
  markup: {
    src: [
      src + '/**/*.{php,html}'
    ],
    dest: dest
  },
  copy: {
    src: [
      src + '/**/*(*.json|!(*.jpg|*.gif|*.png|*.css|*.html|*.css|CHANGELOG.md|*.js))' // Meta files e.g. Screenshot for WordPress Theme Selector
    ],
    dest: dest
  },
  bump: {
    unreleasedPlaceholder: /## unreleased/ig, // To be replaced in documents with version number
    prereleaseChangelogs: false, // If true, changelog update with prerelease bump
    options: {
      preid : 'beta' // Set the prerelase tag to use
    }
  },
  changelog: {
    src: './CHANGELOG.md',
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    transforms: {
      uglifyify: false
    },
    // Additional file extentions to make optional
    extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/resources/javascripts/index.js',
      dest: dest,
      outputName: 'app.js'
    }/*, {
      entries: './src/javascript/head.coffee',
      dest: dest,
      outputName: 'head.js'
    }*/]
  }
};
