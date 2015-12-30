# craffft

Craffft is a black boxed build system for creating future proof applications 
on web technologies and languages.

## Quickstart

```
npm install git+ssh://git@dev.whatwedo.ch:wwd-internal/craffft.git
```

## Features

Processing following languages or file formats:

**Javascript**
* Transpiles JavaScript EcmaScript 2015 to ES5
* Processes TypeScript to JavaScript *including ES6*
* Supports multiple bundles and mixing of ES6, TypeScript and ES5

**Styles**
* Processes Sass, Stylus, Less
* Transpile CSS Selector Level 4
* Auto prefixing for different vendors

**Images**
* Optimize and minimize jpg, png, gif and svg

**Server**
* Mirror changes to the browser, live, via browserSync
* Sync scrolling, typing and other interactions to all connected devices

## Why use it?

With “black boxed” we mean, it should serve as an interface to whatever build
system or technology is running in the background. As an example, the build
system could change from grunt to gulp one day because gulp seems faster, but
for the developer using the Craffft it doesn't matter. He can still use
the same configurations, he can still rely on Sass, what ever one needs for his
projects.

The main goal is to make it work out of the box with precompilers or techniques
are most popular and make it easy to upgrade without changing configs.

## Getting started

TBD

## Configuration

```json
// Overwrite settings by placing them into your settings file.
{
  // Where source files are stored. Relative to root.
  // Every processor's src is relative to this.
  "src": "./src",
  
  // Where processed files should go. Relative to root.
  // Every processor's dest is relative to this.
  "dest": "./dist",
  
  //-------- Global Configuration --------
  "options": {
    
    // Your project version, default from package.json
    "version": "",
    
    // Temporary folder used to process multiple files
    "tmpDir": "./.craffft-tmp",                 
    
    // Node Modules Folder. Used for excludes and import references.                            
    "nodeModulesDir": "./node_modules",
    
    // Bower Components Folder. Used for excludes and import references.
    "bowerComponentsDir": "./bower_components"
  },
  
  //-------- Server Configuration --------
  "server": {
    
    // Server Plugins
    "plugins": [
      "browserSync"
    ],
    
    // Server options
    "options": {
      
      // BrowserSync configuration
      "browserSync": {
        
        // Automatically open a new browser window on server start
        "open": false,
        
        // Files to watch and serve
        "files": [
          "**",
          // Exclude Map files
          "!**.map"
        ]
      }
    }
  },
  // -------- CSS Configuration --------
  "styles": {
    // Where to search for styles
    // Create named bundles, e.g. styles, styles2,...
    "src": [
      "**/*.css"
    ],
    // Supported preprocessors
    "preprocessors": [
      "postcss",
      "stylus",
      "sass",
      "less"
    ],
    // Configure compilation and preprocessors
    "options": {
      // postcss configuration
      "postcss": {
        "processors": [
          // Allow imports
          "postcss-import",
          // Automatically prefix attributes
          "autoprefixer",
          // Use CSS Selector Level 4
          "cssnext",
          // Combine all media queries
          "css-mqpacker"
          // Minify CSS
          // 'csswring'
        ]
      },
      // Stylus configuration. Will be processed before CSS/PostCSS
      "stylus": {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from SCSS, LESS, CSS
        // TODO: Merge with styles.src
        "src": [
          "**/*.{styl,stylus}",
          "!**/_*.{styl,stylus}",
          "!**/*.craffft.styl"
        ],
        // Minify
        "compress": false,
        // Shortcut references
        // Shortcut references possible everywhere, e.g. @import 'bower_components/bla'
        // Shortcut references possible everywhere, e.g. @import 'node_modules/bla'
        "include": [
          "./node_modules/../",
          "./bower_components/../"
        ]
      },
      // Sass configuration. Will be processed before CSS/PostCSS
      "sass": {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from Stylus, LESS, CSS
        // TODO: Merge with styles.src
        "src": [
          "**/*.{scss,sass}",
          "!**/_*.{scss,sass}",
          "!**/*.craffft.scss"
        ],
        // How to handle comments
        "sourceComments": "normal"
      },
      // LESS configuration. Will be processed before CSS/PostCSS
      "less": {
        // Where to search for styles
        // Create named bundles, e.g. styles, styles2,...
        // Will be merged with equivalent bundles from Stylus, Scss, CSS
        // TODO: Merge with styles.src
        "src": [
          "**/*.less",
          "!**/_*.less",
          "!**/*.craffft.less"
        ]
      },
      // Autoprefixing configuration.
      // Only affects output when styles.options.postcss.processors contains 'autoprefixer'
      "autoprefixer": {
        // For which browsers to prefix
        "browsers": [
          "last 2 version",
          "safari 5",
          "ie 9",
          "opera 12.1",
          "ios 6",
          "android "
        ]
      }
    }
  },
  // -------- Images Configuration --------
  // See: https://github.com/sindresorhus/gulp-imagemin
  "images": {                                                                    
    "src": [
      "**/*.jpg",
      "**/*.png",
      "**/*.gif",
      "**/*.svg"
    ],
    "options": {
      // (png) 0 - 7 trials
      "optimizationLevel": 3, 
      
      // (jpg) Lossless conversion to progressive
      "progressive": true, 
      
      // (gif) Interlace gif for progressive rendering   
      "interlaced": true,  
      
      // (svg) Optimize svg multiple times until it's fully optimized.   
      "multipass": false,  
      
      // (svg) Plugins   
      "svgoPlugins": [], 
      
      // Additional Plugins     
      "use": [                
        "imagemin-pngquant"
      ]
    }
  },
  
  //-------- Images Configuration --------
  "markup": {
    "src": [
      "**/*.{php,html}"
    ]
  },
  
  //-------- Copy Configuration --------
  "copy": {
    "src": []
  },
  
  //-------- Versioning Configuration --------
  "bump": {
    
    // Placeholder to replace with current version number
    "unreleasedPlaceholder": "/## unreleased/ig", 
    
    // If true, changelog update with prerelease bump
    "prereleaseChangelogs": false, 
    
    "options": {
      // What to add for prereleases, e.g. "beta" is going to be v1.0.0-beta.1
      "preid" : "beta" 
    }
  },
  
  //-------- Changelog Configuration --------
  // TODO: Migrate with bump
  "changelog": {
    "src": "./CHANGELOG.md"
  },
  
  //-------- JavaScript Configuration --------
  "javascript": {
    
    // Source files. Process all JavaScript files except partials prefixed with a dash.
    "src": [
      "**/*.js",
      "!**/_*.js"
    ],
    "preprocessors": [
      "typescript"
    ],
    "options": {
      
      // If true, all files will be written to root folder. Default is to keep
      // file structure from src folder.
      "flatten": false                                                              
    }
  }
}
```

## Roadmap

* [x] Migrate config to json
* [x] Can be installed via npm
* [x] Includes precompiling for the most popular CSS syntaxes
  * [x] Sass > v3.3
  * [x] LESS
  * [x] Stylus
  * [x] CSS Selector Level 4 - *using postCSS*
* [x] Includes JavaScript compiling
  * [x] webpack
  * [x] TypeScript
  * [x] ES6 - *using babel*
* [x] Configurable copy tasks for markup files


### Backlog

#### CSS Testing

* Add CSS testing suite via [BackstopJS](https://garris.github.io/BackstopJS/).
* Global CLI runner for project inititalization, configuration and upgrades.

## Dependencies

craffft currently uses following dependencies:

* Webpack including several loaders to compile JavaScript ES5, EcmaScript 2015
  and TypeScript
* Gulp with several addons for running tasks
* PostCSS and Autoprefixer
* Node-Sass, gulp-stylus and gulp-less for processing Sass and Stylus
