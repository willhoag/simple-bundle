import gulp from 'gulp'
import rev from 'gulp-rev'
import revReplace from 'gulp-rev-replace'
import useref from 'gulp-useref'
import filter from 'gulp-filter'
import uglify from 'gulp-uglify'
import csso from 'gulp-csso'
import postcss from 'gulp-postcssrc'
import babel from 'gulp-babel'
import rollup from 'gulp-rollup-stream'
import del from 'del'
import RcFinder from 'rcfinder'


const bundleConf = new RcFinder('rollup.config.js', {
  loader: function (path) {
    return path ? require(path) : false
  }
}).find(process.cwd()) || { format: 'iife' }

const jsFilter = filter("**/*.js", { restore: true })
const cssFilter = filter("**/*.css", { restore: true })

export default function bundle({src=['index.html'], dest='dist'}) {

  // coerce to array
  src = [].concat(src)

  // accomidates multiple source html files
  const negatedSourceStrings = src.map(function (str) {
    return '!' + str
  })
  const htmlFilter = filter(['**/*'].concat(negatedSourceStrings)
    , { restore: true })

  return del(dest).then((paths) => {
    return new Promise((resolve, reject) => {
      gulp.src(src)
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(rollup(bundleConf))
        .pipe(babel())
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(postcss())
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
