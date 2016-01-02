# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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

### Changes
* Log is supressed by default. To see full output of the building process, use `npm run log`.
* Compile + Watch is now the default task.

### Breaking changes
* **Config is now in json format.** It's no longer submitted via a `gulpfile.js`. Instead it's decoupled. To use, **convert your config to json and save it as `craffftconfig.json` in your project's root.

## v0.4.0 - 2015-11-30
### Changes
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
