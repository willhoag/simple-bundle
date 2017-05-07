const gulp = require('gulp')
const rev = require('gulp-rev')
const ref = require('gulp-ref')
const revReplace = require('gulp-rev-replace')
const filter = require('gulp-filter')
const uglify = require('gulp-uglify')
const csso = require('gulp-csso')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const rollup = require('gulp-rollup-stream')
const del = require('del')
const RcFinder = require('rcfinder')

const bundleConf = new RcFinder('rollup.config.js', {
  loader: function (path) {
    return path ? require(path) : false
  }
}).find(process.cwd()) || { format: 'iife' }

const jsFilter = filter('**/*.js', { restore: true })
const cssFilter = filter('**/*.css', { restore: true })

module.exports = function bundle ({src=['index.html'], dest='dist'}) {

  // coerce to array
  src = [].concat(src)

  // accomidates multiple source html files
  const srcFilter = filter(['**/*'].concat(src.map((str) => '!' + str))
    , { restore: true })

  return del(dest).then((paths) => {
    return new Promise((resolve, reject) => {
      gulp.src(src)
        .pipe(ref())
        .pipe(jsFilter)
          .pipe(rollup(bundleConf))
          .pipe(babel())
          .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
          .pipe(postcss())
          .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(srcFilter)
          .pipe(rev())
        .pipe(srcFilter.restore)
        .pipe(revReplace())
        .on('error', reject)
        .pipe(gulp.dest(dest))
        .on('end', resolve)
    })
  })
}
