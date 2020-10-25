"use-strict";

// our main application for handling user interaction

// delete
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
