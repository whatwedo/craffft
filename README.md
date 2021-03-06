![unmaintained](http://img.shields.io/badge/status-unmaintained-red.png)

Currently unmaintained because we're not doing less frontend work than before.

---

<img width="200" src="https://raw.githubusercontent.com/whatwedo/craffft/develop/artwork/logo_rendered.png" alt="craffft" >

**craffft** is a api wrapper for the most popular file processing systems e.g. webpack, gulp, grunt. It was built to 
serve as build system with a low level api, making it possible to replace the technologies and frameworks in the 
background without affecting projects using it e.g. moving from grunt to gulp without the need to replace all configurations 
in your projects.

## Quickstart

### Setup

1. Install craffft via npm
  ```
  $ npm install craffft
  ```

2. Add craffft commands to your package.json's scripts.
  ```json
  "scripts": {
      "compile": "craffft-compile",
      "watch": "craffft-watch",
      "build": "craffft-build",
      "version": "craffft-version",
      "changelog": "craffft-changelog"
    }
  ```

3. Run those commands as you defined them. For example, the compile script
  ```
  $ npm run compile
  ```

If you need additional logs, run a command like this:
```
$ npm run compile -- --outputLog
```

## Features

Processing following languages or file formats:

**Javascript**
* Transpiles JavaScript EcmaScript 2015 to ES5
* Processes TypeScript to JavaScript *including ES2015*
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


## Configuration

To change default configuration, add a craffft-config.json to your root directory.

Here's how a config can look like:

```json
{
  "src": "./test/src",
  "dest": "./test/dist",
  "options": {
    "watchPolling": 500
  },
  "copy": {
    "src": ["copy-this-file.md"]
  }
}
```

### `src`
*Default*: `./src` 

Folder where the source files are stored.

### `dest`
*Default*: `./dist`

Folder where processed files will be stored. *They will keep their original file structure.*

### `options`
Global processing options

#### `options.version`
*Default*: Version of your package.json

Sets the version of your application. This will be used to show the version in several places.

#### `options.tmpDir`
*Default*: `./.craffft-tmp`

Is used to store temporary files during processing.

#### `options.nodeModulesDir`
*Default*: `./node_modules

Change this if you changed the location of your node_modules store.

#### `options.bowerComponentsDir`
*Default*: `./bower_components`

Change this if you changed the location of your browser components store.

#### `options.sourceMaps`
*Default*: `true`

Whether to use Source M`aps in development builds or not.

#### `options.watchPolling`
*Default*: `false`

Use all watchers in polling mode. This is needed for some operating systems which do not have inotify built in in the OS. 
So if your watcher doesn't work, try setting this to true. Might be a needed option for development inside **vagrant**.

* `true`: use polling
* number: use polling with specified interval

### `server`

Options for the servers used during development mode.

#### `server.plugins`
*Default*: `["browserSync"]`

An array of servers running during development.

#### `server.options`

Server options.

*Default*:

```json
"browserSync": {
  "open": false,
  "files": [
    "dist/**",
    "dist/!**.map"
  ]
}
```

### `styles`

Options for processing styles.

*Default*: 

```json
"styles": {
  "src": [
    "**/*.css",
    "!**/*.css"
  ],
  "preprocessors": [
    "postcss",
    "stylus",
    "sass",
    "less"
  ],
  "options": {
    "postcss": {
      "processors": [
        "postcss-import",
        "postcss-cssnext",
        "autoprefixer",
        "css-mqpacker"
      ]
    },
    "stylus": {
      "src": [
        "**/*.styl",
        "**/*.stylus",
        "!**/_*.styl",
        "!**/_*.stylus",
        "!**/*.craffft.styl"
      ],
      "include": [
        "./node_modules/../",
        "./bower_components/../"
      ]
    },
    "sass": {
      "src": [
        "**/*.scss",
        "**/*.sass",
        "!**/_*.scss",
        "!**/_*.sass",
        "!**/*.craffft.scss"
      ],
      "sourceComments": "normal"
    },
    "less": {
      "src": [
        "**/*.less",
        "!**/_*.less",
        "!**/*.craffft.less"
      ]
    },
    "autoprefixer": {
      "browsers": [
        "last 2 version",
        "safari 5",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android >= 4"
      ]
    }
  }
},
```

### `images`

Options for processing images.

*Default*:

```json
"images": {                                                                   
  "src": [
    "**/*.jpg",
    "**/*.png",
    "**/*.gif",
    "**/*.svg"
  ],
  "options": {
    "optimizationLevel": 3, 
    "progressive": true, 
    "interlaced": true,  
    "multipass": false,  
    "svgoPlugins": [], 
    "use": [                
      "imagemin-pngquant"
    ]
  }
}
```

### `markup`

Options for processing markup files. At this moment, it only copies the specified files.

*Default*:

```json
"markup": {
  "src": [
    "**/*.php",
    "**/*.html"
  ]
}
```

### `copy`

Options for copying processes. This can be used for other files that don't need any processing e.g. .txt

*Default*:

```json
"copy": {
  "src": []
}
```

### `versioning`

This configuration controls how your project's versioning works. These settings are used to automatically 
bump your project's version number and create changelogs.

*See [Keep a Changelog](http://keepachangelog.com/) for an example changelog, [semver.org](http://semver.org) for 
versioning guidelines.*

*Default*:
```json
"versioning": {
  "base": "[package.version]",
  "prereleaseIdentifier": "beta",
  "replaceInMarkup": true,
  "replaceInStyles": true,
  "placeholder": "{CRAFFFT_PROJECT_VERSION}",
  "changelog": {
    "src": "./CHANGELOG.md",
    "output": {
      "path": "/",
      "filename": "changelog"
    },
    "unreleasedPlaceholder": "/## Unreleased/ig",
    "prereleaseChangelogs": false
  }
}
```

### `javascript`

Options for processing JavaScript.

*Default*:
```json
"javascript": {
  "src": [
    "**/*.js",
    "**/*.ts",
    "!**/_*.js",
    "!**/_*.ts"
  ],
  "preprocessors": [],
  "options": {
    "flatten": false                                                              
  }
}
```

#### `options.preprocessors`

Array of strings.

Available options:

* `typescript`


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

* CSS Testing
* Add CSS testing suite via [BackstopJS](https://garris.github.io/BackstopJS/).
* Global CLI runner for project inititalization, configuration and upgrades.

## Dependencies

craffft currently uses following dependencies:

* Webpack including several loaders to compile JavaScript ES5, EcmaScript 2015
  and TypeScript
* Gulp with several addons for running tasks
* PostCSS and Autoprefixer
* Node-Sass, gulp-stylus and gulp-less for processing Sass and Stylus

## Contribution

### Tests

Run npm test task to link the binaries and make a test build.
```
$ npm test
```
