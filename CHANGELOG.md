# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## v0.22.0 - 2016-11-11

### Added
* Changelog: Name and output destination of the changelog can now be changed.
  ```
  "versioning": {
    "changelog": {
      "output": {
        "path": "/",
        "filename": "changelog"
      }
    }
  }
  ```
* New commands: `craffft-changelog` and `craffft-version`. You can change your package.json:
    ```json
    "scripts": {
      "compile": "craffft-compile",
      "watch": "craffft-watch",
      "build": "craffft-build",
      "version": "craffft-version",
      "changelog": "craffft-changelog"
    }
  ```

  *craffft-bump* still works but will be gone in future.*

### Changes
* Dependencies updated to latest version
* The changelog `unreleasedPlaceholder` no longer takes regex patterns.

### Breaking changes
* Typescript was updated to version 2.0. See [Microsoft Wiki](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-20) for more details.
* Bump and changelog configuration has been merged.
  **Before**
  ```
  "bump": {
    "unreleasedPlaceholder": "## v0.28.1 - 2016-11-11",
    "prereleaseChangelogs": false,
    "options": {
      "preid": "beta"
    }
  },
  "changelog": {
    "src": "CHANGELOG.md"
  }
  ```

  **New**
  ```
  "versioning": {
    "base": "[package.version]",
    "prereleaseIdentifier": "beta",
    "changelog": {
      "src": "./CHANGELOG.md",
      "output": {
        "path": "/",
        "filename": "changelog"
      },
      "unreleasedPlaceholder": "## v0.28.1 - 2016-11-11",
      "prereleaseChangelogs": false
    }
  }
  ```

### Fixed
* Message about duplicate autoprefixer is gone.
* The changelog unreleasedPlaceholder will now correctly be updated.
* Build and Compile show the correct user config mode in terminal.

## v0.21.0 - 2016-08-22
### Added
* New scripts to run directly without flags
  * `craffft-compile`: Single compilation
  * `craffft-watch`: Watch for changes and compile
  * `craffft-build`: Build for production
  * `craffft-bump`: Change version of your project
* Easier to implement. See README.

### Changed
* `bin/craffft` and running commands with flags instead is deprecated.

## v0.20.1 - 2016-06-13
### Changed
* Remove TypeScript as default JavaScript preprocessor.

## v0.20.0 - 2016-06-06
### Added
* **`options.watchPolling`**: You can now activate polling to fix watching issues in virtual machines.
* **Bump:** Bump your project version with `--bump` command line parameter.

### Fixed
* Console now logs all compilation information.
* JavaScript watcher now works inside vagrant virtual machines when polling option activated.

### Changed
* Removed native system and growl notifications for compatibility in vagrant environment.

## v0.19.0 - 2016-03-04
### Fixed
* Make asset watcher for CSS, images and markup working in vagrant environments.

## v0.18.0 - 2016-03-01
### Fixed
* Reimplement CSS import globbing after they were removed from postcss-import.

## v0.17.0 - 2016-03-01
### Added
* `--outputLog` flag to show detailed log of the build.
* `options.sourceMaps` in craffft-config.json to output sourcemaps for JavaScript, TypeScript and CSS, when `--build` flag isn't set. *Default is `true`*

### Breaking changes
* TypeScript was updated to version 1.8.2. See [TypeScript Release Log](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-18) for further details.

## v0.16.0 - 2016-02-08
### Added
* Adds TypeScript support. Use with adding typescript as preprocessor to the craffft-config.json. **Hint**: All es2015 code 
 will also be transpiled to es5.
  
  ```json
    "javascript": {
      "preprocessors": [
        "typescript"
      ]
    }
  ```
  **Important:** After adding TypeScript, craffft will only process .ts files and skips js files.

## v0.15.0 - 2016-01-04
### Changed
* Command for running the build is now unified with flags.

## v0.12.0 - 2016-01-02
### Added
* Build for production with `--build` flag. Minifies Javascript and CSS.

### Changes
* Remove stylus compression option in config. It's automatically used in production builds.

## v0.11.0 - 2015-12-30

### Added
* Watch: The watcher was reimplemented. Use `npm run watch` to watch for file changes or just run the default task.

### Fixes
* PostCSS does no longer throw deprecation warnings.

### Changed
* Log is supressed by default. To see full output of the building process, use `npm run log`.
* Compile + Watch is now the default task.

### Breaking changes
* **Config is now in json format.** It's no longer submitted via a `gulpfile.js`. Instead it's decoupled. To use, **convert your config to json and save it as `craffftconfig.json` in your project's root.

## v0.4.0 - 2015-11-30
### Changed
* JavaScript config now takes an array with glob patterns including negotations. 
  It then automatically makes bundles and keeps file structure as is in src folder.

## v0.1.0 - 2015-09-28
### Added
* **Javascript**
  * Transpiles JavaScript EcmaScript 2015 to ES5
  * Processes TypeScript to JavaScript *including ES6*
  * Supports multiple bundles and mixing of ES6, TypeScript and ES5

* **Styles**
  * Processes Sass, Stylus, Less and raw CSS
  * Supports multiple bundles and mixing of all three languages
