var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('js', function(){
  // Archivos de entrada: todos loas archivos dentro de src/js y que tengan la extension js
  return gulp.src('src/js/*.js')
  .pipe(concat('app.min.js')) //Conector: Pipe hace referencia al plugin que vamos a usar
  .pipe(babel({ presets: ['env'] })) // Que transpile el archivo d ela liena anterior gracias a Babel
  .pipe(uglify()) // Que lo minifique
  .pipe(gulp.dest('dist/js/'))
})

gulp.task('css', function(){
  return gulp.src(['src/css/*.css', 'src/sass/*.scss']) // Gracias a los corchetes, creamos un array de rutas hacemos posible que una tarea tome como punto de entrada más rutas
  .pipe(sass())
  .pipe(concat('main.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css/'))
})

// Juntando tareas para minifcarlas todas a la vez
// gulp.task('default', ['css', 'js'])

gulp.task('watch', function(){
  gulp.watch(['src/css/*.css', 'src/sass/*.scss'], ['css']);
  gulp.watch('src/js/*.js', ['js']);
})