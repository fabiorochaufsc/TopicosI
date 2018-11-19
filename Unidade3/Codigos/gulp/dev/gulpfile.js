var gulp       = require('gulp');
var gutil      = require('gulp-util'); 
var concat     = require('gulp-concat');
var minifycss  = require('gulp-minify-css');
var livereload = require('gulp-livereload'); 
var prettify   = require('gulp-jsbeautifier');
var clean      = require('gulp-clean')
let rename     = require("gulp-rename");
let uglify     = require('gulp-uglify-es').default;
var pump       = require('pump');
var replace    = require('gulp-replace-task');
var moment     = require('moment');

var css = {
	source:'css',
	target:'../build/www/css'
};

var img = {
  source:'img',
  target:'../build/www/img'
};

var js = {
	source:'js',
	target:'../build/www/js'
};

var fonts = {
  source:'fonts',
  target:'../build/www/fonts'
};

var html = {
  source:'',
  target:'../build/www'
};

gulp.task('clean', function() {
  gulp.src([css.target])
        .pipe(clean({force: true}))

  gulp.src([js.target])
        .pipe(clean({force: true}))

  gulp.src([fonts.target])
        .pipe(clean({force: true}))

  gulp.src([img.target])
        .pipe(clean({force: true}))
});

gulp.task('css', function(){
	gulp.src([css.source+'/*.css'])
	.pipe(minifycss())
	.pipe(concat("all.min.css"))
  .pipe(gulp.dest(css.target))
  .pipe(livereload());
});






// ********************************* FINAL **************************************
gulp.task('html-final', function(){
  gulp.src([html.source+'index.html'])
   .pipe(replace({
      patterns: [
        {
          match: 'INCLUDE_JS',
          replacement: '\n<!-- INCLUDES DURANTE DESENVOLVIMENTO -->\
          \n<script type="text/javascript" src="js/all.min.js"></script>'
        }
      ]
    }))
   .pipe(replace({
      patterns: [
        {
          match: 'INCLUDE_CSS',
          replacement: '\n<!-- INCLUDES DURANTE DESENVOLVIMENTO -->\
          \n <link rel="stylesheet" href="css/all.min.css">'
        }
      ]
    }))
  .pipe(gulp.dest(html.target))
  .pipe(livereload());
});

gulp.task('css-final', function(){
  gulp.src([css.source+'/*.css'])
  .pipe(minifycss())
  .pipe(concat("all.min.css"))
  .pipe(gulp.dest(css.target))
  .pipe(livereload());
});


gulp.task('js-final', function(){
  moment.locale('pt-br'); 

   gulp.src([js.target+'/*.js'], {read: false})
    .pipe(clean({force: true}))

  gulp.src([js.source+'/*.js'])
    .pipe(concat('all.min.js'))
    .pipe(replace({
      patterns: [
        {
          match: 'BUILD',
          replacement: moment().format('LL')
        }
      ]
    }))
    .pipe(uglify({mangle:true, toplevel: true}))
    .pipe(gulp.dest(js.target))
    .pipe(livereload());

});


gulp.task('img', function(){
  gulp.src([img.source+'/*.*'])
  .pipe(gulp.dest(img.target))
});



// ********************************* DESENVOLVIMENTO **************************************

gulp.task('js', function(){

  moment.locale('pt-br'); 
     gulp.src([js.source+'/*.js'])
     .pipe(replace({
      patterns: [
        {
          match: 'BUILD',
          replacement: moment().format('LL')
        }
      ]
    }))
  .pipe(gulp.dest(js.target))
  .pipe(livereload());
});

gulp.task('html', function(){
  gulp.src([html.source+'index.html'])
   .pipe(replace({
      patterns: [
        {
          match: 'INCLUDE_JS',
          replacement: '\n<!-- INCLUDES DURANTE DESENVOLVIMENTO -->\
          \n<script type="text/javascript" src="js/index.js"></script>\
          \n<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>\
          \n<script type="text/javascript" src="js/phonon.js"></script>\
          \n<script type="text/javascript" src="js/pubsub.js"></script>'
        }
      ]
    }))
    .pipe(replace({
      patterns: [
        {
          match: 'INCLUDE_CSS',
          replacement: '\n<!-- INCLUDES DURANTE DESENVOLVIMENTO -->\
          \n<link rel="stylesheet" href="css/phonon.css">\
          \n<link rel="stylesheet" href="css/client.css">'
        }
      ]
    }))
  .pipe(gulp.dest(html.target))
  .pipe(livereload());
});





gulp.task('default', ['img','css','js','html']);

gulp.task('final', ['img','css-final','js-final','html-final']);



gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(css.source+'/*.css',['css']);
	gulp.watch(js.source+'/*.js',['js']);
  gulp.watch(img.source+'/*.*',['img']);
  gulp.watch(html.source+'*.html',['html']);


})



