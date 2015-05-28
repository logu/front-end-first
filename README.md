# front-end-first
Repo utilisé pour le Meetup JS-star.paris sujet : Front end first



Comment moker les données ? 

1/ Données à partir de csv : 

npm install --save-dev gulp-convert

var convert = require('gulp-convert');

// data generation
gulp.task('data', function(){
  gulp.src(['app/data/csv/*.csv'])
    .pipe(convert({
      from: 'csv',
      to: 'json'
     }))
    .pipe(gulp.dest('app/data/json/'));
});

2/ Données à partir d'un google spreadsheet 

https://docs.google.com/spreadsheets/d/11Qt8cUt8dh0hgmd21CoSi0rl9RDMvfBoQbQ-pEhmtgY/pubhtml?gid=0&single=true

npm install --save-dev gulp-json-editor gulp-google-spreadsheets

var gulpSheets = require('gulp-google-spreadsheets');
var jeditor = require("gulp-json-editor");

var spreadsheetId = '11Qt8cUt8dh0hgmd21CoSi0rl9RDMvfBoQbQ-pEhmtgY';

// data generation
gulp.task('fetch-data', function(){
    gulpSheets(spreadsheetId)
    .pipe(jeditor(function(json) {
      return json.rows; 
    }))
    .pipe(gulp.dest('app/data/json/'))  
});
