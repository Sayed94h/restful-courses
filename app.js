"use-strict";

// our main application for handling user interaction
const express = require("express");
const fs = require("fs");
const app = express();
let courses;
app.get("/", function (req, res) {
  fs.readFile("./courses.json", "utf-8", (err, data) => {
    res.send(data);
  });
});
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
app.listen(3000, () => console.log("connecting ......"));
