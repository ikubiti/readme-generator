// Include packages needed for this application
const inquirer = require('inquirer');
const utility = require('./utility');
const markDown = require('./generateMarkdown');


const prompt = inquirer.createPromptModule();
let projectTitle = '';
let readMeBadge = '';
let readMeBody = '\n';

const initProject = {};
const inputData = {};
let askAgain = true;
let key = 'title';

// const questions = [
// 	{
// 		type: 'input',
// 		name: 'projectTitle',
// 		message: 'Please enter the project title?',
// 		validate: utility.checkInput,
// 	},
// 	// utility.inputType('theme', 'description'),
// 	// utility.note(inputData.theme, 'descr'),
// 	// {
// 	// 	type: 'input',
// 	// 	name: 'description',
// 	// 	message: utility.fontBlue('Please provide the project description?'),
// 	// 	validate: utility.checkInput,
// 	// },
// ];

const questions = {
	title: utility.getTitle('project'),
	description: utility.getSectionDetails('description'),
	// installation: utility.getInstallation,
};

function decider(index, answer) {
	switch (index) {
		case 0:
			inputData.title = answer.projectTitle;
			questions.push(utility.inputType('theme', 'description'));
			break;

		case 1:
			inputData.theme = answer.theme;
			questions.push(utility.note(inputData.theme, 'descr'));
			break;

		case 2:
			inputData.description = !answer.descr ? '' : answer.descr;
			questions.push(utility.noteLink(inputData.description, inputData.theme));
			break;

		case 3:
			if (answer.noteLink) inputData.noteLink = answer.noteLink;
			questions.push(
				{
					type: 'input',
					name: 'description',
					message: utility.fontBlue('Please provide the project description?'),
					validate: utility.checkInput,
				}
			);
			break;

		case 4:
			inputData.description1 = answer.description;
			break;

		default:
	}
}

async function getProjectTitle() {
	let proTitle = await prompt(utility.getTitle('project')).then((answer) => answer);
	projectTitle = markDown.formatTitle(proTitle.title.toUpperCase());
	console.log(proTitle);
	console.log(projectTitle);
}

async function subMain(question) {
	let temp = await prompt(question).then((answers) => answers);
	return temp;
}

// Write result to file and the console
async function main() {
	while (askAgain) {
		let anAnswer = await subMain(questions[key]);
		decider(i, anAnswer);
	}

	// for (let i = 0; i < questions.length; i++) {
	// 	let anAnswer = await subMain(questions[i]);
	// 	decider(i, anAnswer);
	// }
}


// returns the formatted read text for the README.md file
initProject.getTemplate = async () => {
	console.log(utility.fontCyan("\nWelcome to the Professional README.md Generator!\nLet's show the world what you built through your README file!!!\n"));

	await getProjectTitle();

	// await main();

	// //	const initialProj = await main();
	// //	console.log(initialProj);
	// console.log(inputData);

	return projectTitle + readMeBadge + readMeBody;
};





module.exports = initProject;
