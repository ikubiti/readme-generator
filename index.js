// TODO: Include packages needed for this application
const fs = require('fs');
const appMain = require('./utils/appReadMe');
const readMeFile = './utils/README.md';

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) =>
		err ? console.log(err) : console.log("Your professional grade README file is ready!")
	);
}

// TODO: Create a function to initialize app
async function init() {
	// const data = {
	// 	title: 'README Generator',
	// 	description: '',
	// 	installation: '',
	// };

	// const textData = markDown(data);
	// console.log(textData);

	let readMeData = await appMain.getTemplate();
	writeToFile(readMeFile, readMeData);
}

// Function call to initialize app
init();
