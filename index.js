// require dependencies
const fs = require("fs");

// declare constants
const ENTRIES_PATH = `${__dirname}/entries.json`;

const DOC_STRING = `
COMMANDS:

  all
    print all entries to the console

  read <key>
    print a single key/value pair to the console

  delete <key>
    remove the entry with this key

  write <key> <value>
    set the given key/value pair

FLAGS:

  -h
    print this helpful message
`;

// --- begin main script ---

// step 0: log the docs for
if (process.argv.includes("-h")) {
	console.log(DOC_STRING);
	// this line tells Node to stop right now, done, end, finished.
	//  it's kind of like an early return, but for a node app
	process.exit(0);
}

// step 1: declare main app function
const entriesManager = (entries, command, key, value) => {
	// step 5: make sure command is defined
	//  alert the user and exit early if it is not
	if (command === undefined) {
		console.log(`a command is required  \nSee "node file.js -h"`);
		process.exit();
	}

	// step 6: make sure the first argument is one of the 4 supported commands
	//  alert the user and exit early if it is not
	let commandArr = ["write", "read", "delete", "all"];
	if (!commandArr.includes(`${command}`)) {
		console.log(`${command} is not a valid command  \nSee "node file.js -h"`);
		process.exit();
	}

	/* 	
	this if statement has some problem because the command is equal to one of the four commands 
	but it still prints 'command is not a valid command'

if (
		command !== "write" ||
		command !== "read" ||
		command !== "delete" ||
		command !== "all"
	) {
		console.log(`${command} is not a valid command  \nSee "node file.js -h"`);
		process.exit();
	} */

	// step 7: log all entries if the user passed the 'all' command
	//  this command does not require any other user arguments
	//  exit early since there are no changes to save
	if (command === "all") {
		console.log(entries);

		process.exit();
	}

	// step 8: all remaining commands require at least a key
	//  alert the user and exit early if there is no key
	if (key === undefined) {
		console.log(
			`a key is required, cannot ${command}  \nSee "node file.js -h"`,
		);
		process.exit();
	}

	// step 9: conditionally execute the logic for the remaining commands
	if (command === "read") {
		// step 9 a.1: make sure the key exists before trying to read it
		//  alert the user and exit early if it does not
		if (!entries.hasOwnProperty(`${key}`)) {
			console.log(`key "${key}" does not exist. cannot read`);
			process.exit();
		}

		// step 9 a.2: print the requested entry
		//  exit early, there are no changes to save
		console.log(`${key}: ${entries[key]}`);
		process.exit();
	} else if (command === "delete") {
		// step 9 b.1: make sure the key exists before trying to delete it
		//  alert the user and exit early if it does not
		if (!entries.hasOwnProperty(`${key}`)) {
			console.log(`key "${key}" does not exist. cannot delete`);
			process.exit();
		}

		// step 9 b.2: delete the correct entry
		//  do not exit early!  this change needs to be saved to the file system

		delete entries[`${key}`];
	} else if (command === "write") {
		// step 9 c.1: make sure the value is defined
		//  alert the user and exit early if they did not
		if (value === "") {
			console.log(`no value provided.  cannot write "${key}"`);
			process.exit();
		}

		// step 9 c.2:  write the key/value pair in entries
		entries[`${key}`] = `${value}`;
		//  do not exit early!  this change needs to be saved to the file system
	}
	// step 10: convert the new entries object to a string
	const toStringfy = entries;

	const newEntriesString = JSON.stringify(toStringfy, null, " ");
	// step 11: declare writeFileCallback
	const writeFileCallback = (err) => {
		// step 13: let the user know if their changes were successfully saved
		if (err) {
			console.log("Your changes did not saved");
			process.exit();
		}

		console.log("your changes were saved");
		console.log(`(${command}) ${key}`);
	};

	// step 12: save changes to the file system (how can you save changes to the file system?)
	fs.writeFile(ENTRIES_PATH, newEntriesString, "UTF-8", writeFileCallback); // this overwrites the whole content of the json file
	// how can you just add the file or property to the json file?
};

// step 2: declare callback that uses main app function
const readFileCb = (err, entriesString) => {
	// step 4: handle file system error, or execute main app function
	if (err) {
		console.log(err);
	}

	const parsedEntries = JSON.parse(entriesString);

	//console.log("parsedEntries", parsedEntries);
	// const arguments = process.argv.slice(2);
	// const command = arguments[0];
	// const key = arguments[1];
	// const value = arguments[2];
	// console.log("comm s: ", command, "key s: ", key, "valu s: ", value);

	//entriesManager(parsedEntries, command, key, value);
	entriesManager(
		parsedEntries,
		process.argv[2],
		process.argv[3],
		process.argv[4],
	);
};

// step 3: read the stored data and execute the callback
fs.readFile(ENTRIES_PATH, "utf8", readFileCb);