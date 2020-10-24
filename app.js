"use-strict";

// our main application for handling user interaction

const express = require('express'); // module express
const app = express(); // call express

//add a piece of middleware (help us to use in request method)
app.use(express.json())

// Port
const port = process.env.PORT || 6000 // make port
app.listen(port, () => console.log(`listen to ${port}..`)) // listen the server

app.get('/basicCourse', (req, res) => {

    const fs = require('fs'); //get file
    const json = fs.readFileSync(`${__dirname}/courses.json`, 'utf-8') // read file
    const courseData = JSON.parse(json)
    res.send(courseData)

});
