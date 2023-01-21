// Include packages needed for this application
const fs = require('fs');
const appMain = require('./utils/appReadMe');
const readMeFile = './README1.md';

// const path = require('path');

// Write to the README file
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) =>
		err ? console.log(err) : console.log("Your professional grade README file is ready!")
	);
}

// Initializes and creates README template
async function init() {
	let readMeData = await appMain.getTemplate();
	writeToFile(readMeFile, readMeData);
}

// Function call to initialize app
init();