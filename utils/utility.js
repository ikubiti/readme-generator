const inquirer = require('inquirer');
const fs = require('fs');

const utility = {};

function fontColor(color, text) {
	if (!text) return '';

	switch (color.toLowerCase()) {
		case 'black':
			return `\x1b[30m${text}\x1b[0m`;

		case 'red':
			return `\x1b[31m${text}\x1b[0m`;

		case 'green':
			return `\x1b[32m${text}\x1b[0m`;

		case 'yellow':
			return `\x1b[33m${text}\x1b[0m`;

		case 'purple': case 'magenta':
			return `\x1b[35m${text}\x1b[0m`;

		case 'cyan':
			return `\x1b[36m${text}\x1b[0m`;

		case 'white':
			return `\x1b[37m${text}\x1b[0m`;

		case 'gray':
			return `\x1b[90m${text}\x1b[0m`;

		default:
			return `\x1b[34m${text}\x1b[0m`;
	}
};

// render text in preferred color
utility.fontRed = (text) => fontColor('red', text);
utility.fontGreen = (text) => fontColor('green', text);
utility.fontYellow = (text) => fontColor('yellow', text);
utility.fontBlue = (text) => fontColor('blue', text);
utility.fontPurple = (text) => fontColor('purple', text);
utility.fontMagenta = (text) => fontColor('magenta', text);
utility.fontCyan = (text) => fontColor('cyan', text);
utility.fontWhite = (text) => fontColor('white', text);
utility.fontGray = (text) => fontColor('gray', text);

// check for empty inputs
utility.checkInput = (value) => {
	if (value || value.length > 0) {
		return true;
	}

	return 'Please enter some text!!!';
};

utility.getTitle = (section) => {
	const aSection = !section ? 'subsection' : section;
	const question = {
		type: 'input',
		name: 'title',
		message: `Please enter the ${aSection} title?`,
		validate: utility.checkInput,
	};

	return question;
};

// get a playbook for any section input
utility.getSectionDetails = (section) => {
	const newQuestion = {};
	// type: 'input',

	return newQuestion;
}

// Determines the input type and subsequent questions
utility.getInputType = (section) => {
	// const content = !value ? 'content' : value;
	const questionContent = !section ? "Select the input type?" : `Select the input type for section "${section}"?`;

	const newQuestion = {
		type: 'expand',
		name: 'inputType',
		message: utility.fontYellow(questionContent),
		choices: [
			{
				key: 'n',
				name: 'A Note without links',
				value: 'note',
			},
			{
				key: 'l',
				name: 'A Note with links',
				value: 'noteLink',
			},
			{
				key: 'i',
				name: 'Add Image',
				value: 'image',
			},
			{
				key: 's',
				name: 'Add a Subsection',
				value: 'subsection',
			},
		],
	};

	return newQuestion;
};

// Get a note based on user input
utility.getNote = (inputType) => {
	// const content = !value ? 'multiText' : value;
	const newQuestion = {
		type: 'editor',
		name: 'inputNote',
		message: utility.fontYellow('Please add your content to this note!!'),
		validate: utility.checkInput,
		waitUserInput: true,
		when() {
			return inputType === 'note' || inputType === 'noteLink';
		}

	};

	return newQuestion;
};

// Get all the link texts from the user's input
utility.getNoteLinks = (inputType, note) => {
	let content = utility.fontYellow('Enter all link texts separated by a comma.');
	content += utility.fontPurple(`\n${note}`);
	const newQuestion = {
		type: 'input',
		name: 'noteLink',
		message: content,
		validate: utility.checkInput,
		waitUserInput: true,
		when() {
			return inputType === 'noteLink';
		}

	};
	return newQuestion;
};


utility.getLinks = (noteLinks) => {
	const questions = [];
	for (let i = 0; i < noteLinks.length; i++) {
		let prompt = fontYellow(`Please the link associated with ${noteLinks[i]}`);
		questions.push(
			{
				type: 'input',
				name: noteLinks[i],
				message: prompt,
				validate: utility.checkInput
			}
		);
	}

	return questions;
}




module.exports = utility;
