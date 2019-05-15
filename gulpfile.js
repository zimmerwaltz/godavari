//Required
var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
htmlreplace =require('gulp-html-replace'), //replace filenames for css and js into one
concat = require('gulp-concat'),
gulpIf = require('gulp-if'),
uglify = require('gulp-uglify-es').default, //minify js files
cleanCSS = require('gulp-clean-css'), //minify css files
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'), //compress image files
cache = require('gulp-cache'),
del = require('del'), //to delete files which are passed to it
runSequence = require('run-sequence');

//Tasks 

//sass task
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')//matching any scss file in scss or its sub folders
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('app/css'))//saving to destination folder
    .pipe(browserSync.reload({ //make browsersync inject new css into browser on reload
      stream: true
    }))

});


//concat js files into one
gulp.task('concatJs', function() {
  return gulp.src(['app/js/jquery.min.js','app/js/preloader.js','app/js/bootstrap.min.js', 'app/js/main.js'])
    .pipe(gulpIf('!*.min.js', uglify()))//ignore already min files
    .pipe(concat('bundle.min.js'))//concat into single file
    .pipe(gulp.dest('dist/js'))
});

//concat css files into one
gulp.task('concatCss', function() {
  return gulp.src('app/css/**/*.css')
    .pipe(gulpIf('!*.min.css', cleanCSS()))//ignore already min files
    .pipe(concat('bundle.min.css'))//concat into single file
    .pipe(gulp.dest('dist/css'))
});

//replace js and css references with concat filed created above
gulp.task('cleanHTML', function() {
  return gulp.src('app/index.html')
    .pipe(htmlreplace({
        'css': 'css/bundle.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

//optimize images. Not to be excuted all the time
gulp.task('optimizeImages', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin([
            imagemin.optipng({
                optimizationLevel: 1,
                bitDepthReduction:true,
                colorTypeReduction:true,
                paletteReduction:true
            })
        ])))
        .pipe(gulp.dest('dist/images'))
});

//copying all fonts to dist
gulp.task('fonts', function(){
   gulp.src('app/webfonts/*')
        .pipe(gulp.dest('dist/webfonts'));
    
    gulp.src('app/fontawesome/scss/*.scss')
        .pipe(gulp.dest('dist/fontawesome/scss'));
});

//delete dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//browser sync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app' //root of the server
    },
  })
});

//building the production files
gulp.task('build', function (callback) {
  runSequence('clean:dist','sass','concatJs','concatCss','cleanHTML','optimizeImages','fonts',callback);
});

//Task that will watch files for changes
gulp.task('watchFiles',['browserSync','sass'], function(){ //start browserSync and sass tasks concurrently before watch
   gulp.watch('app/scss/**/*.scss', ['sass']);  //watch scss files
   gulp.watch('app/*.html', browserSync.reload); //watch html files
  gulp.watch('app/js/**/*.js', browserSync.reload); //watch js files
});

//clear cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})
