# Craffft

Craffft is a black boxed build system for creating future proof web
applications and web apps.

## Features

**Javascript**
* Transpiles JavaScript EcmaScript 2015 to ES5
* Processes TypeScript to JavaScript *including ES6*
* Supports multiple bundles and mixing of ES6, TypeScript and ES5

**Styles**
* Processes Sass, Stylus, Less and raw CSS
* Auto prefixing for different vendors
* Supports multiple bundles and mixing of all three languages

**Server**
* Include BrowserSync, a development server for live reloading on changes

## Why use it?

With “black boxed” we mean, it should serve as an interface to whatever build
system or technology is running in the background. As an example, the build
system could change from grunt to gulp one day because gulp seems faster, but
for the developer using the Craffft it doesn't matter. He can still use
the same configurations, he can still rely on Sass, what ever one needs for his
projects.

The main goal is to make it work out of the box with precompilers or techniques
are most popular. Make it “magic” working like Meteor.js.

## Getting started

TBD

## Roadmap

### Milestone v1.0.0

* [ ] Can be installed via npm
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

Add CSS testing suite via [BackstopJS](https://garris.github.io/BackstopJS/).

## Dependencies

craffft currently uses following dependencies:

* Webpack including several loaders to compile JavaScript ES5, EcmaScript 2015
  and TypeScript
* Gulp with several addons for running tasks
* PostCSS and Autoprefixer
* Node-Sass, gulp-stylus and gulp-less for processing Sass and Stylus
