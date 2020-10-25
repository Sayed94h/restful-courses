"use-strict";

// our main application for handling user interaction
const express = require("express"); // module express
const app = express(); // call express

//add a piece of middleware (help us to use in request method)
app.use(express.json());

// Port
const port = process.env.PORT || 6000; // make port
app.listen(port, () => console.log(`listen to ${port}..`)); // listen the server

// file system
const fs = require("fs"); //get file
const json = fs.readFileSync(`${__dirname}/courses.json`, "utf-8"); // read file
const courseData = JSON.parse(json);

// read data from file
app.get("/basicCourse", (req, res) => {
 res.send(courseData);
});


// delete data from file
app.get("/:id", function (req, res) {
  courses = JSON.parse(data);
  courses = courses.filter((element) => element.id != req.params.id);
  fs.writeFile("./courses.json", courses, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("course deleted");
    res.send(" course deleted");
  });
});




