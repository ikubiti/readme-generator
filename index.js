// TODO: Include packages needed for this application

const markDown = require('./utils/generateMarkdown');
const initProj = require('./utils/startProject');

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
async function init() {
	// const data = {
	// 	title: 'README Generator',
	// 	description: '',
	// 	installation: '',
	// };

	// const textData = markDown(data);
	// console.log(textData);

	await initProj.init();
	console.log('Moment of truth!');
}

// Function call to initialize app
init();
