# Web Build Kit

Web Build Kit is a black boxed build system for creating future proof web
applications and web apps.

## Why use it?

With “black boxed” we mean, it should serve as an interface to whatever build
system or technology is running in the background. As an example, the build
system could change from grunt to gulp one day because gulp seems faster, but
for the developer using the Web Build Kit it doesn't matter. He can still use
the same configurations, he can still rely on Sass, what ever one needs for his
projects.

The main goal is to make it work out of the box with precompilers or techniques
are most popular. Make it “magic” working like Meteor.js.

## Release requirements

* [ ] Can be install via npm
* [ ] Includes precompiling for the most popular CSS syntaxes
  * [ ] Sass > v3.3
  * [ ] LESS
  * [ ] Stylus
  * [ ] CSS Selector Level 4 - *using postCSS*
* [ ] Includes JavaScript compiling
  * [ ] browserify
  * [ ] webpack
  * [ ] TypeScript
  * [ ] ES6 - *using babel*
* [ ] Configurable copy tasks for markup files
