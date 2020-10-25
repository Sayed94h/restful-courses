"use-strict";

// our main application for handling user interaction
const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const fs = require("fs");
const dbPath = "./data/courses.json";
console.log("dbPath: ", dbPath);
/**
 * jsonData is parsed data from the file courses.json
 * toWrite is converted data to string to write to the file courses.json
 */
let jsonData, toWrite;

//	read from json file

function readCallBack(err, data) {
	if (err) {
		console.log(err);
		process.exit();
	}
	let parsedData = JSON.parse(data);
	jsonData = parsedData;
	console.log("dataaa: ", jsonData, "type of dataaa", typeof jsonData);
}

fs.readFile(dbPath, "UTF-8", readCallBack);

app.get("/", (req, res) => {
	res.send("Welcome to our website");
});

app.get("/api/courses", (req, res) => {
	res.send(jsonData);
});

app.get("/api/courses/:id", (req, res) => {
	let specificCourse = jsonData.find(function (c) {
		return c.id === parseInt(req.params.id);
	});

	if (!specificCourse) {
		res.status(404).send("The course with given ID was not found");
	}
	res.send(specificCourse);
});

app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	// simple input validation
	// if (!req.body.name || req.body.name.length < 3) {
	// 	res.status(400).send("Name is required and should be mini 3 char");
	// 	return;
	// }
	const newCourse = {
		id: jsonData.length + 1,
		name: req.body.name,
	};
	// push to the json array
	jsonData.push(newCourse);

	// convert to string
	toWrite = JSON.stringify(jsonData, null, " ");

	// write to json file
	fs.writeFile(dbPath, toWrite, "UTF-8", (err) => {
		if (err) {
			console.log("Your changes did not saved");
			process.exit();
		}

		console.log("your changes were saved");
	});
	res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
	//get the data

	let specificCourse = jsonData.find(function (c) {
		return c.id === parseInt(req.params.id);
	});

	if (!specificCourse) {
		return res.status(404).send("The course with given ID was not found");
	}
	// validate the input
	const { error } = validateCourse(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	// update the data
	specificCourse.name = req.body.name;
	toWrite = JSON.stringify(jsonData, null, " ");

	// write to json file (save changes)
	fs.writeFile(dbPath, toWrite, "UTF-8", (err) => {
		if (err) {
			console.log("Your changes did not saved");
			process.exit();
		}

		console.log("your changes were saved");
	});
	res.send(specificCourse);
});

app.delete("/api/courses/:id", (req, res) => {
	//get the data

	let specificCourse = jsonData.find(function (c) {
		return c.id === parseInt(req.params.id);
	});

	if (!specificCourse) {
		return res.status(404).send("The course with given ID was not found");
	}

	// update the data

	const index = jsonData.indexOf(specificCourse);

	jsonData.splice(index, 1);
	toWrite = JSON.stringify(jsonData, null, " ");

	// write to json file
	fs.writeFile(dbPath, toWrite, "UTF-8", (err) => {
		if (err) {
			console.log("Your changes did not saved");
			process.exit();
		}

		console.log("your changes were saved");
	});
	res.send(specificCourse);
});
// validate logic
function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const result = schema.validate(course);
	return result;
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to the port ${port}...`));
