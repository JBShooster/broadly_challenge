//Setting up the app
var express= require('express');
var app = express();
var bodyParser = require('body-parser');

//Our tools to retrieve our data
var request = require('request');
var async= require('async');
var ineed = require('ineed');

//Configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Configuring Express router
app.listen(3000);   
var router = express.Router(); 

main();
function main(){
  ineed.collect.texts.from('http://challenge.broadly.com/classes',  
    function (err, response, result) {
       console.log("List of class URLs: ");
       broadlyData = result.texts;
       collectClasses(broadlyData);
       collectStudents(classList);
  });
}

function collectClasses(x){
  classData = JSON.parse(x);
  classList = classData.classes;
  console.log(classList);
  console.log("--------------");
}

function collectStudents(y){
  data = async.map(y, httpGet, function(err, res){
    if(err) return console.log(err);
    fullData = res;

    //Room Count and complete list of students
    rooms=0;
    students =[];

    //Students 25 and older
    studentsAboveTwentyFive = [];
    finalStudentsCount = 0;

    //Counting the room numbers and students
    for(i=0; i<fullData.length; i++){
      rooms++;
      students.push(fullData[i].students);
    }
    students = ([].concat.apply([], students));

    //Let's find out how many students were above 25
    for(i=0; i<students.length; i++){
      if(students[i].age >= 25){
        studentsAboveTwentyFive.push(students[i]);
        finalStudentsCount++;
      }
    }

    //Telling the user what they want to know
    console.log("Students 25 and older");
    console.log(studentsAboveTwentyFive);
    console.log("------------------");
    console.log("There were " + rooms + " classes today.");
    console.log("Today\'s attendance of students 25 and older is " + finalStudentsCount);
    console.log("The average class-size today was: " + (finalStudentsCount / rooms).toFixed(2) + " students");
  });
}

//This helper function allows us to handle multiple URL requests
function httpGet(url, callback) {
  options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}