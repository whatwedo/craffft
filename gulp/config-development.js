var packageConfig = require('../package.json');

// Overwrite settings by placing them into your settings file.
// TODO: Migrate to JSON
module.exports = {
  
  // Where source files are stored. Relative to root.
  // Every processor's src is relative to this.
  src: './src',
  
  // Where processed files should go. Relative to root.
  // Every processor's dest is relative to this.
  dest: './dist',
  
  //-------- Global Configuration --------
  options: {
    
    // Your project version, default from package.json
    version: packageConfig.version,
    
    // Temporary folder used to process multiple files
    tmpDir: './.craffft-tmp',                 
    
    // Node Modules Folder. Used for excludes and import references.                            
    nodeModulesDir: './node_modules',
    
    // Bower Components Folder. Used for excludes and import references.
    bowerComponentsDir: './bower_components'
  },
  
  //-------- Server Configuration --------
  server: {
    
    // Server Plugins
    plugins: [
      'browserSync'
    ],
    
    // Server options
    options: {
      
      // BrowserSync configuration
      browserSync: {
        
        // Automatically open a new browser window on server start
        open: false,
        
        // Files to watch and serve
        files: [
          '**',
          // Exclude Map files
          '!**.map'
        ]
      }
    }
  },
  // -------- CSS Configuration --------
  styles: {
    // Where to search for styles
    // Create named bundles, e.g. styles, styles2,...
    src: [
      '**/*.css'
    ],
    // Supported preprocessors
    preprocessors: [
      'postcss',
      'stylus',
      'sass',
      'less'
    ],
    // Configure compilation and preprocessors
    options: {
      // postcss configuration
      postcss: {
        processors: [
          // Automatically prefix attributes
          'autoprefixer',
          // Combine all media queries
          'css-mqpacker',
          // Allow imports
          'postcss-import'
          // Minify CSS
          // 'csswring'
        ]
      },
      // Stylus configuration. Will be processed before CSS/PostCSS
      stylus: {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from SCSS, LESS, CSS
        // TODO: Merge with styles.src
        src: [
          '**/*.{styl,stylus}',
          '!**/_*.{styl,stylus}',
          '!**/*.craffft.styl'
        ],
        // Minify
        compress: false,
        // Shortcut references
        // Shortcut references possible everywhere, e.g. @import 'bower_components/bla'
        // Shortcut references possible everywhere, e.g. @import 'node_modules/bla'
        include: [
          './node_modules/../',
          './bower_components/../'
        ]
      },
      // Sass configuration. Will be processed before CSS/PostCSS
      sass: {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from Stylus, LESS, CSS
        // TODO: Merge with styles.src
        src: [
          '**/*.{scss,sass}',
          '!**/_*.{scss,sass}',
          '!**/*.craffft.scss'
        ],
        // How to handle comments
        sourceComments: 'normal'
      },
      // LESS configuration. Will be processed before CSS/PostCSS
      less: {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from Stylus, Scss, CSS
        // TODO: Merge with styles.src
        src: [
          '**/*.less',
          '!**/_*.less',
          '!**/*.craffft.less'
        ]
      },
      // Autoprefixing configuration.
      // Only affects output when styles.options.postcss.processors contains 'autoprefixer'
      autoprefixer: {
        // For which browsers to prefix
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
  // -------- Images Configuration --------
  // See: https://github.com/sindresorhus/gulp-imagemin
  images: {                                                                    
    src: [
      '**/*.jpg',
      '**/*.png',
      '**/*.gif',
      '**/*.svg'
    ],
    options: {
      // (png) 0 - 7 trials
      optimizationLevel: 3, 
      
      // (jpg) Lossless conversion to progressive
      progressive: true, 
      
      // (gif) Interlace gif for progressive rendering   
      interlaced: true,  
      
      // (svg) Optimize svg multiple times until it's fully optimized.   
      multipass: false,  
      
      // (svg) Plugins   
      svgoPlugins: [], 
      
      // Additional Plugins     
      use: [                
        'imagemin-pngquant'
      ]
    }
  },
  
  //-------- Images Configuration --------
  markup: {
    src: [
      '**/*.{php,html}'
    ]
  },
  
  //-------- Copy Configuration --------
  copy: {
    src: []
  },
  
  //-------- Versioning Configuration --------
  bump: {
    
    // Placeholder to replace with current version number
    unreleasedPlaceholder: /## unreleased/ig, 
    
    // If true, changelog update with prerelease bump
    prereleaseChangelogs: false, 
    
    options: {
      // What to add for prereleases, e.g. "beta" is going to be v1.0.0-beta.1
      preid : 'beta' 
    }
  },
  
  //-------- Changelog Configuration --------
  // TODO: Migrate with bump
  changelog: {
    src: './CHANGELOG.md',
  },
  
  //-------- JavaScript Configuration --------
  javascript: {
    
    // Source files. Process all JavaScript files except partials prefixed with a dash.
    src: [
      '**/*.js',
      '!**/_*.js'
    ],
    preprocessors: [
      'typescript'
    ],
    options: {
      
      // If true, all files will be written to root folder. Default is to keep
      // file structure from src folder.
      flatten: false                                                              
    }
  }
};
