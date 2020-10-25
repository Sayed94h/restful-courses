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
  res.status(200);
  res.send(courseData);
});

// delete data from file
app.get("/:id", function (req, res) {
  const data = fs.readFileSync(`${__dirname}/courses.json`, "utf-8");
  let courses = JSON.parse(data);
  courses = courses.filter((element) => element.id != req.params.id);
  console.log(courses);
  fs.writeFile(
    `${__dirname}/courses.json`,
    JSON.stringify(courses),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("course deleted");
      res.send(" course deleted");
    },
  );
});
