var gulp = require('gulp')
var config = require('../config')
var gbump = require('gulp-bump')
var prompt = require('gulp-prompt')
var handleErrors = require('../util/handleErrors')
var semver = require('semver')
var replace = require('gulp-replace')
var gutil = require('gulp-util')

var bumpTask = function (cb) {
  var target = './*' // project root

  gulp.src(target).pipe(prompt.prompt({
    type: 'list',
    name: 'gbump',
    message: 'What type of gbump would you like to do?',
    choices: [ 'patch', 'minor', 'major', 'prerelease' ]
  }, function (res) {
    var selectedChoice = res.gbump
    var newVer = semver.inc(config.options.version, selectedChoice)

    if (selectedChoice === 'prerelease') {
      // Prerelease was chosen
      // Semver increment current
      var recommendedVersion = semver.inc(config.options.version, 'pre', config.bump.options.preid)
      var prereleaseChoices = [
        'Set a new version'
      ]

      if (recommendedVersion) {
        // Add recommendation if semver is able to make one
        prereleaseChoices.unshift(recommendedVersion)
      }

      gulp.src(target).pipe(prompt.prompt({
        type: 'list',
        name: 'prerelease',
        message: 'What version will it be?',
        choices: prereleaseChoices
      }, function (res) {
        if (res.prerelease === 'Set a new version') {
          // Set explicit prerelease version
          gulp.src(target).pipe(prompt.prompt({
            type: 'input',
            name: 'version',
            message: 'Set a new version e.g. 1.0.0 (will be automatically suffixed with ' + config.bump.options.preid + ')'
          }, function (res) {
            newVer = res.version + '-' + config.bump.options.preid + '.0'
            gbumpFiles(newVer, cb, true)
          }))
        } else {
          newVer = recommendedVersion
          gbumpFiles(newVer, cb, true)
        }
      }))
    } else {
      gbumpFiles(newVer, cb)
    }
  }))
}

var gbumpFiles = function (newVer, callback, prerelease) {
  var waitCounter = 0
  var date = new Date()
  var yyyy = date.getFullYear().toString()
  var mm = (date.getMonth() + 1).toString() // getMonth() is zero-based
  var dd = date.getDate().toString()
  var dateHumanReadable = yyyy + '-' + (mm[ 1 ] ? mm : '0' + mm[ 0 ]) + '-' + (dd[ 1 ] ? dd : '0' + dd[ 0 ])

  gulp.src([ './bower.json', './package.json' ])
    .pipe(gbump({
      version: newVer
    }))
    .pipe(gulp.dest('./'))
    .on('error', handleErrors)
    .on('end', function () {
      aftergbump(waitCounter)
    })

  gutil.log(prerelease)

  if (!prerelease || (prerelease && config.bump.prereleaseChangelogs)) {
    // replace version in CHANGELOG
    gulp.src([ './CHANGELOG.md' ])
      .pipe(replace(config.bump.unreleasedPlaceholder, '## v' + newVer + ' - ' + dateHumanReadable))
      .pipe(gulp.dest('./'))
      .on('error', handleErrors)
      .on('end', function () {
        aftergbump(waitCounter)
      })
  }

  callback()
}

var aftergbump = function (waitCounter) {
  waitCounter++
  if (waitCounter === 2) {
    gulp.start('build')
  }
}

gulp.task('bump', bumpTask)
module.exports = bumpTask
