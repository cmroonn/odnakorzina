const gulp = require("gulp"),
  sass = require("gulp-sass"),
  babel = require("gulp-babel"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber");

// Sass
gulp.task("sass", async () => {
  gulp
    .src("app/scss/style.scss", "app/scss/media.scss")
    .pipe(plumber())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true,
      })
    )
    .pipe(sass())
    .pipe(gulp.dest("app/css"));
});

// Babel
gulp.task("babel", () =>
  gulp
    .src("app/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist/js"))
);

gulp.task("js-libs", async () => {
  gulp.src("app/js/libs/*.js").pipe(gulp.dest("dist/js/libs"));
});

// Watch task
gulp.task("watch", () => {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
});

gulp.task("prebuild", async () => {
  gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));

  gulp.src("app/img/**/*").pipe(gulp.dest("dist/img"));

  gulp.src("app/*.html").pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.parallel("prebuild", "babel", "js-libs"));
