var packageConfig = require('../package.json');

var dest = './dist';
var src = './src';

var bowerComponents = './bower_components';
var nodeModules = './node_modules';

module.exports = {
  src: src,
  srcAbsolute: false,                                                           // Will be set by script based on src
  dest: dest,
  destAbsolute: false,                                                          // Will be set by script based on dest
  options: {
    version: packageConfig.version,                                             // Your project version, default from package.json
    tmpDir: './.web-build-kit-tmp'                                              // Temporary folder used to process multiple files
  },
  server: {
    baseDir: [
      dest
    ],
    plugins: [
      'browserSync'
    ],
    options: {
      browserSync: {
        open: false,
        files: [
          dest + '/**',
          // Exclude Map files
          '!' + dest + '/**.map'
        ]
      }
    }
  },
  styles: {
    src: {                                                                      // Where to search for styles
      styles: [
        src + '/**/*.css'
      ]
    },
    dest: dest,                                                                 // Where to put them in, recursively
    preprocessors: [                                                            // Supported preprocessors
      'postcss',
      'stylus',
      'sass'
    ],
    options: {                                                                  // Configure compilation and preprocessors                                                            // If false, build keeps folder structure
      postcss: {
        processors: [                                                           // postcss plugins
          'autoprefixer',
          'css-mqpacker',
          'postcss-import'                                                      // Combines media queries
          // 'csswring'                                                         // Minifies CSS
        ]
      },
      stylus: {                                                                 // Will be processed before CSS                                        // Files to watch
        src: {
          styles: [
            src + '/**/*.{styl,stylus}',
            '!' + src + '/**/_*.{styl,stylus}'
          ],
          webBuildKitTest: [
            src + '/**/_*.web-build-kit.styl'
          ]
        },
        compress: false,
        include: [
          bowerComponents + '/../',                                             // Shortcut references possible everywhere, e.g. @import 'bower_components/bla'
          nodeModules + '/../'                                                  // Shortcut references possible everywhere, e.g. @import 'node_modules/bla'
        ]
      },
      sass: {                                                                 // Will be processed before CSS                                        // Files to watch
        src: {
          styles: [
            src + '/**/*.{scss,sass}',
            '!' + src + '/**/_*.{scss,sass}',
            '!' + src + '/**/*.web-build-kit.scss'
          ],
          webBuildKitTest: [
            src + '/*.web-build-kit.scss'
          ]
        },
        sourceComments: 'normal'
      },
      autoprefixer: {                                                           // Automatically prefix properties
        browsers: [
          'last 2 version',
          'safari 5',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ]
      }
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
  javascript: {
    src: {
      scripts: './index'
    },
    dest: dest
  }
};
