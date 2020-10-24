"use-strict";

// our main application for handling user interaction



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

