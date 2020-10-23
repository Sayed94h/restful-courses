"use-strict";

// our main application for handling user interaction

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(3000, () => console.log("listening to port 3000..."));
