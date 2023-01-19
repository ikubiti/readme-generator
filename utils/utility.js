// Importing all required modules
const inquirer = require('inquirer');
// const checkbox = require('inquirer-checkbox-plus');

// const fs = require('fs');

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

const tableContents = [
	new inquirer.Separator(' = The Standard Template = '),
	{
		name: 'Description',
		checked: true,
	},
	{
		name: 'Table of Contents',
		checked: true,
	},
	{
		name: 'Installation',
		checked: true,
	},
	{
		name: 'Features',
	},
	{
		name: 'Usage',
		checked: true,
	},
	{
		name: 'How to Contribute',
	},
	{
		name: 'Tests',
	},
	{
		name: 'Credits',
		checked: true,
	},
	{
		name: 'License',
		checked: true,
	},

	new inquirer.Separator(' = ReadMe Customization ='),
	{
		name: 'Add more sections',
	},
	{
		name: 'Create Custom Table of Contents',
	},
];

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
	if (value.trim() || value.trim().length > 0) {
		return true;
	}

	return utility.fontRed('Please enter some text!!!');
};

// Checks custom selection of table of contents
utility.checkCustomSelection = (answer) => {
	if (answer.length < 3) {
		return utility.fontRed('Please select at least 3 sections');
	} else if (answer.includes('Add more sections') && answer.includes('Create Custom Table of Contents')) {
		return utility.fontRed('You cannot select "Add more sections" and "Create Custom Table of Contents"!\nPlease select only one of them');
	}

	return true;
};

utility.capitalizeFirstLetter = (text) => {
	let sentence = [];
	text.split(' ').forEach(word => {
		let newWord = word.trim();
		if (newWord.length > 0) {
			sentence.push(word.charAt(0).toUpperCase() + word.slice(1));
		}
	});

	return sentence.join(' ');
}


utility.getTitle = (section) => {
	const aSection = !section ? 'subsection' : section;
	return {
		type: 'input',
		name: 'title',
		message: `Please enter the ${aSection} title?`,
		validate: utility.checkInput,
	};
};

utility.getTableOfContents = () => {
	return {
		type: 'checkbox',
		message: 'Select the section you want to include in your readme file\nHit enter to accept the default table of contents',
		name: 'tableOfContents',
		pageSize: 7,
		choices: tableContents,
		validate: utility.checkCustomSelection,
	};
};

utility.getCustomSections = (userPrompt) => {
	let customPrompt = 'Enter the title of your custom sections separated by commas';
	if (userPrompt === 'addMore') {
		customPrompt = 'Add more sections separated by commas';
	}

	return {
		type: 'input',
		name: 'custom',
		message: customPrompt,
		validate: utility.checkInput,
	};
};


/////////////////////////////////////////////////////////////////////////

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
