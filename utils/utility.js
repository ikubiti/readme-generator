// Importing all required modules
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// The object returned by this module
const utility = {};
const imagePath = './images/';

// display messages in preferred colors to user to gain attention
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
		name: 'Contributing',
		checked: true,
	},
	{
		name: 'Tests',
		checked: true,
	},
	{
		name: 'Credits',
	},
	new inquirer.Separator(' = ReadMe Customization ='),
	{
		name: 'Add more sections',
	},
	{
		name: 'Create Custom Table of Contents',
	},
];

utility.getImageFiles = async () => {
	try {
		return await fs.promises.readdir(imagePath);
	} catch (err) {
		console.error('Error occurred while reading directory!', err);
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
	if (value.trim() || value.trim().length > 0) {
		return true;
	}

	return utility.fontRed('Please enter some text!!!');
};

utility.matchDataInput = (note, text) => {
	let answer = [];
	if (!text || text.trim().length === 0) {
		return answer;
	}

	let allLinks = text.split(',');
	allLinks.forEach(link => {
		let alink = link.trim();
		const regex = new RegExp(`${alink}`, '');
		if (alink.length > 0 && note.match(regex)) {
			answer.push(alink);
		}
	});

	return answer;
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
	let title = text.toLowerCase();
	title.split(' ').forEach(word => {
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

// Determines the input type and subsequent questions
utility.getInputType = (section) => {	// const content = !value ? 'content' : value;
	let question = `Press "h" for help\n`;
	question += !section ? "Select the input type?" : `Select the input type for section "${section}"?`;

	const newQuestion = {
		type: 'expand',
		name: 'inputType',
		message: utility.fontYellow(question),
		choices: [
			{
				key: 'n',
				name: 'A paragraph without links',
				value: 'note',
			},
			{
				key: 'l',
				name: 'A paragraph with links',
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
			{
				key: 'x',
				name: 'Exit this section',
				value: 'exit',
			},
		],
	};

	return newQuestion;
};

// Get a note based on user input
utility.getNote = () => {
	const newQuestion = {
		type: 'editor',
		name: 'inputNote',
		message: utility.fontGreen('Please add your content to this note!!'),
		validate: utility.checkInput,
		waitUserInput: true,
	};

	return newQuestion;
};

// Get all the link texts from the user's input
utility.getNoteLinks = (note) => {
	let content = utility.fontYellow('Enter all link display texts separated by a comma.');
	content += utility.fontPurple(`\n${note}`);
	const newQuestion = {
		type: 'input',
		name: 'links',
		message: content,
		waitUserInput: true,
	};
	return newQuestion;
};


utility.getLinks = (noteLinks) => {
	const questions = [];
	for (let i = 0; i < noteLinks.length; i++) {
		let prompt = utility.fontYellow(`Please the link associated with "${utility.fontPurple(noteLinks[i])}"`);
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

// get a playbook for any section input
utility.getImageDetails = async () => {
	let files = await utility.getImageFiles();
	const questions = [
		{
			type: 'input',
			name: 'displayText',
			message: utility.fontYellow('Enter the display text for the image'),
			validate: utility.checkInput,
			waitUserInput: true,
		},
		{
			type: 'list',
			name: 'fullPath',
			message: 'Type name of image file or navigate to select the image file:',
			choices: files,
			filter(val) {
				newValue = val.replace(/ /g, '%20');
				return imagePath + newValue;
			}
		}
	];

	return questions;
}



// Export the utility API functions
module.exports = utility;
