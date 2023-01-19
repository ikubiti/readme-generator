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
}

async function getSections(customType = 'addMore') {
	let allSections = await prompt(utility.getCustomSections(customType)).then((answer) => {
		let newSections = [];
		answer.custom.split(',').forEach(section => {
			let newSection = section.trim();
			if (newSection.trim().length > 0) {
				newSections.push(utility.capitalizeFirstLetter(newSection));
			}
		});

		return newSections;
	});

	let limit = customType === 'addMore' ? 1 : 3;
	if (allSections.length < limit) {
		console.log(utility.fontRed(`\nPlease enter at least ${limit} sections\n`));
		return await getSections(customType);
	}


	return allSections;
}

// Get the README table of contents
async function getTableOfContents() {
	let { tableOfContents } = await prompt(utility.getTableOfContents()).then((answer) => answer);

	if (tableOfContents.includes('Add more sections')) {
		let newSections = await getSections();
		tableOfContents.pop();
		let index = tableOfContents.indexOf('License');
		newSections.forEach(section => {
			if (!tableOfContents.includes(section)) {
				if (index === -1) {
					tableOfContents.push(section);
				} else {
					tableOfContents.splice(index, 0, section);
					index++;
				}
			}
		});
	}

	if (tableOfContents.includes('Create Custom Table of Contents')) {
		tableOfContents = await getSections(true);
	}

	return tableOfContents;
}

async function subMain(question) {
	let temp = await prompt(question).then((answers) => answers);
	return temp;
}

// Write result to file and the console
async function main(tableOfContents) {
	console.log(tableOfContents);
	// while (askAgain) {
	// 	let anAnswer = await subMain(questions[key]);
	// 	decider(i, anAnswer);
	// }

	// for (let i = 0; i < questions.length; i++) {
	// 	let anAnswer = await subMain(questions[i]);
	// 	decider(i, anAnswer);
	// }
}


// returns the formatted read text for the README.md file
initProject.getTemplate = async () => {
	console.log(utility.fontCyan("\nWelcome to the Professional README.md Generator!\nLet's show the world what you built through your README file!!!\n"));

	await getProjectTitle();

	let tableContent = await getTableOfContents();

	await main(tableContent);

	// //	const initialProj = await main();
	// //	console.log(initialProj);
	// console.log(inputData);

	return projectTitle + readMeBadge + readMeBody;
};





module.exports = initProject;
