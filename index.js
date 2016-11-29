const gulp = require('gulp')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const useref = require('gulp-useref')
const filter = require('gulp-filter')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const csso = require('gulp-csso')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const partialImport = require('postcss-partial-import')
const del = require('del')

const jsFilter = filter("**/*.js", { restore: true })
const cssFilter = filter("**/*.css", { restore: true })

module.exports = function bundle({
  src=['index.html']
  , dest='dist'
}) {

  // coerce to array
  src = [].concat(src)

  // accomidates multiple source html files
  const negatedSourceStrings = src.map((str) => '!' + str)
  const htmlFilter = filter(['**/*'].concat(negatedSourceStrings)
    , { restore: true })

  return del(dest).then((paths) => {
    return new Promise((resolve, reject) => {
      gulp.src(src)
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(babel({
          presets: [
            require('babel-preset-es2015')
          ],
          plugins: [
            require('babel-plugin-transform-runtime')
          ]
        }))
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(postcss([
          cssnext(),
          partialImport()
        ]))
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(htmlFilter)
        .pipe(rev())
        .pipe(htmlFilter.restore)
        .pipe(revReplace())
        .on('error', reject)
        .pipe(gulp.dest(dest))
        .on('end', resolve)
    })
  })
}
