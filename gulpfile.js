var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    //cachebust       = require('gulp-cachebust'),
    connect         = require('gulp-connect'),
    cssnano         = require('gulp-cssnano'),
    logger          = require('gulp-plumber'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    rucksack        = require('gulp-rucksack'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    del             = require('del');

// Clean the build directory
gulp.task('clean:build', function () {
    return del.sync([
        './content/css'
    ]);
});

// Compile Sass and move to build folder
gulp.task('css:build', function () {
    gulp.src('./styles/**/*.scss')
        .pipe(logger({
            before: 'Building CSS...',
            after: 'CSS Complete!',
            showChange: false
        }))
        // Watch for pipe errors and output to console
        .pipe(plumber())
        // Start SourceMaps
        .pipe(sourcemaps.init())
        // Run Sass
        .pipe(sass({
            outputStyle: 'nested',
            sync: true
        }))
        // PostCSS Toolkit
        .pipe(rucksack({
            fallbacks: true
        }))
        // Parse CSS and add vendor prefixes
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //Remove ALL Comments and minify CSS if needed
        .pipe(cssnano({
            core: true, // set to true for minify
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./content/css'))
});

gulp.task('connect',function(){
   connect.server({
       port:8079,
       host:'localhost',
       fallback:'index.html',
       livereload:true
   });
    gulp.watch('./styles/**/*.scss',['css:build'],['reload']);
    gulp.watch([
        'index.html',
        './content/**/*.html',
        './content/**/*.js',
        './content/**/*.css'],['reload']);
});

gulp.task('reload',function(){
    gulp.src(['./'])
        .pipe(connect.reload())
});

gulp.task('default',['clean:build','css:build','connect']);