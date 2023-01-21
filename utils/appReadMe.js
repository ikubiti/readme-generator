// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const utility = require('./utility');
const markDown = require('./generateMarkdown');

const prompt = inquirer.createPromptModule();

const initProject = {};
let formatReadMe = [];
let sectionContent = [];
let projectTitle = '';
let contentsTable = '';

let readMeBadge = '';
let readMeBody = '\n';

// Gets the project title from the user
async function getProjectTitle() {
	let proTitle = await prompt(utility.getTitle('project')).then((answer) => answer);
	projectTitle = markDown.formatTitle(proTitle.title.toUpperCase(), 1);
	formatReadMe.push(projectTitle);
}


// Processes the user's custom sections
async function getSections(customType = 'addMore') {
	let allSections = await prompt(utility.getCustomSections(customType)).then((answer) => {
		let newSections = [];
		answer.custom.split(',').forEach(section => {
			let newSection = section.trim();
			if (newSection.length > 0) {
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
		newSections.forEach(section => {
			if (!tableOfContents.includes(section)) {
				tableOfContents.push(section);
			}
		});
	}

	if (tableOfContents.includes('Create Custom Table of Contents')) {
		tableOfContents = await getSections(true);
	}

	// No extra prompts for License, Questions, and Table of Contents
	if (tableOfContents.includes('License')) {
		tableOfContents.splice(tableOfContents.indexOf('License'), 1);
	}

	if (tableOfContents.includes('Table Of Contents')) {
		tableOfContents.splice(tableOfContents.indexOf('Table Of Contents'), 1);
	}

	if (tableOfContents.includes('Questions')) {
		tableOfContents.splice(tableOfContents.indexOf('Questions'), 1);
	}

	contentsTable = markDown.formatTableOfContents(tableOfContents);
	// formatReadMe.push(contentsTable);
	formatReadMe[2] = contentsTable;
	return tableOfContents;
}

async function processLinks(note) {
	let { links } = await prompt(utility.getNoteLinks(note)).then((answer) => answer);
	let allLinks = utility.matchDataInput(note, links);
	if (allLinks.length === 0) {
		console.log(utility.fontRed('Please enter text from your note above please!!!'));
		return await processLinks(note);
	}

	let addedLinks = await prompt(utility.getLinks(allLinks)).then((answer) => answer);
	return markDown.formatLinks(note, addedLinks);
}

// Gets the project title from the user
async function getSubsectionTitle() {
	let proTitle = await prompt(utility.getTitle()).then((answer) => answer);
	let subTitle = utility.capitalizeFirstLetter(proTitle.title);
	let thisTitle = markDown.formatTitle(subTitle, 3);
	sectionContent.push(`\n${thisTitle}`);
	console.log(utility.fontYellow(`\n...constructing the "${subTitle}" subsection...`));
	await subMain(subTitle);
	sectionContent.push('\n```\n');
	console.log(utility.fontGreen(`\n..."${subTitle}" subsection successfully constructed...`));
}

async function subMain(section) {
	let { inputType } = await prompt(utility.getInputType()).then((answers) => answers);
	switch (inputType) {
		case 'note':
			var { inputNote } = await prompt(utility.getNote()).then((answer) => answer);
			sectionContent.push(`\n${inputNote}`);
			return await subMain(section);

		case 'noteLink':
			var { inputNote } = await prompt(utility.getNote()).then((answer) => answer);
			let linkedNoted = await processLinks(inputNote);
			sectionContent.push(`\n${linkedNoted}`);
			return await subMain(section);

		case 'image':
			let question = await utility.getImageDetails();
			let addImage = await prompt(question).then((answer) => answer);
			let addedImage = markDown.formatImage(addImage);
			sectionContent.push(`\n${addedImage}`);
			return await subMain(section);

		case 'subsection':
			await getSubsectionTitle();
			return await subMain(section);

		default:
	}
}

// Write result to file and the console
async function main(tableOfContents) {

	for (let index = 0; index < tableOfContents.length; index++) {
		let section = tableOfContents[index];
		sectionContent = [];
		console.log(utility.fontYellow(`\n...constructing the "${section}" section...`));
		await subMain(section);
		let sectionText = markDown.formatSection(section, sectionContent.join(''));
		if (index === 0) {
			formatReadMe[1] = sectionText;
		} else {
			formatReadMe.push(sectionText);
		}
		console.log(utility.fontGreen(`\n..."${section}" section successfully constructed...`));
	}

	// get info for Question and License sections
}


// returns the formatted read text for the README.md file
initProject.getTemplate = async () => {
	console.log(utility.fontCyan("\nWelcome to the Professional README.md Generator!\nLet's show the world what you built through your README file!!!\n"));

	await getProjectTitle();

	let tableContent = await getTableOfContents();

	await main(tableContent);

	return formatReadMe.join('');
};


module.exports = initProject;
