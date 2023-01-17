// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const utility = require('./utility');
const prompt = inquirer.createPromptModule();
const fileName = './answerLog.txt';

const initProject = {};

const questions = [
	{
		type: 'input',
		name: 'projectTitle',
		message: 'Please enter the project title?',
		validate: utility.checkInput,
	},
	utility.inputType('theme', 'description'),
	utility.note('descr', 'theme'),
	{
		type: 'input',
		name: 'description',
		message: utility.fontBlue('Please provide the project description?'),
		validate: utility.checkInput,
	},
];

// Write result to file and the console
function main() {
	const myAnswers = prompt(questions).then((answers) => {
		fs.appendFile(fileName, `${JSON.stringify(answers)}\n`, (err) =>
			err ? console.error(err) : answers
		);

		return answers;
	});

	return myAnswers;
}



initProject.init = async () => {
	console.log(utility.fontCyan("Let's get your README.md file generated!!!"));

	const initialProj = await main();
	console.log(initialProj);

};





module.exports = initProject;
// {
// 	sum: (a, b) => a + b,
// 	difference: (a, b) => a - b,
// 	product: (a, b) => a * b,
// 	quotient: (a, b) => a / b,
// };

// const inquirer = require('inquirer');
// const fs = require('fs');
// const fileName = 'answerLog.txt';

// console.log("Hi, Let's get to know you better!");

// function checkInput(value) {
// 	if (value || value.length > 0) {
// 		return true;
// 	}

// 	return 'Please enter a valid entry';
// }

// const questions = [
// 	{
// 		type: 'input',
// 		name: 'userName',
// 		message: 'What is your name?',
// 		validate: checkInput,
// 	},
// 	{
// 		type: 'input',
// 		name: 'language',
// 		message: "What languages do you know?",
// 		validate: checkInput,
// 	},
// 	{
// 		type: 'input',
// 		name: 'preferredMethod',
// 		message: 'What is your preferred method of communication??',
// 		validate: checkInput,
// 	},
// ];

// inquirer.prompt(questions).then((answers) => {
// 	// Write result to file and the console
// 	fs.appendFile(fileName, `${JSON.stringify(answers)}\n`, (err) =>
// 		err ? console.error(err) : console.log(answers)
// 	);
// });