var packageConfig = require('../package.json');

module.exports = {
  src: './src',
  dest: './dist',
  options: {
    version: packageConfig.version,                                             // Your project version, default from package.json
    tmpDir: './.web-build-kit-tmp',                                             // Temporary folder used to process multiple files
    nodeModulesDir: './node_modules',
    bowerComponentsDir: './bower_components'
  },
  server: {
    plugins: [
      'browserSync'
    ],
    options: {
      browserSync: {
        open: false,
        files: [
          '**',
          // Exclude Map files
          '!**.map'
        ]
      }
    }
  },
  styles: {
    src: {                                                                      // Where to search for styles
      styles: [
        '**/*.css'
      ]
    },
    preprocessors: [                                                            // Supported preprocessors
      'postcss',
      'stylus',
      'sass',
      'less'
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
            '**/*.{styl,stylus}',
            '!**/_*.{styl,stylus}',
            '!**/*.web-build-kit.styl'
          ],
          webBuildKitTest: [
            '**/_*.web-build-kit.styl'
          ]
        },
        compress: false,
        include: [
          './node_modules/../',                                                 // Shortcut references possible everywhere, e.g. @import 'bower_components/bla'
          './bower_components/../'                                              // Shortcut references possible everywhere, e.g. @import 'node_modules/bla'
        ]
      },
      sass: {                                                                   // Will be processed before CSS                                        // Files to watch
        src: {
          styles: [
            '**/*.{scss,sass}',
            '!**/_*.{scss,sass}',
            '!**/*.web-build-kit.scss'
          ],
          webBuildKitTest: [
            '*.web-build-kit.scss'
          ]
        },
        sourceComments: 'normal'
      },
      less: {
        src: {
          styles: [
            '**/*.less',
            '!**/_*.less',
            '!**/*.web-build-kit.less'
          ],
          webBuildKitTest: [
            '*.web-build-kit.less'
          ]
        }
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
    src: 'resources/images/**',
    dest: 'resources/images',
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
      '**/*.{php,html}'
    ]
  },
  copy: {
    src: [
      '**/*.json'
    ]
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
  },
  javascript: {
    src: {
      scripts: [
        'typescript/app.ts',
        'index.js'
      ]
    },
    preprocessors: [
      'typescript'
    ]
  }
};
