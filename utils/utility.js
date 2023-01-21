// Importing all required modules
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// The object returned by this module
const utility = {};
const imagePath = './images/';

// Present a list of licenses to the user
const licenses = [
	'Apache license 2.0', 'GNU General Public License v3.0', 'MIT', 'BSD 2 - clause "Simplified" license', 'BSD 3 - clause "New" or "Revised" license', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense', 'Academic Free License v3.0', 'Artistic license 2.0', 'BSD 3 - clause Clear license',
	'Creative Commons license family', 'Creative Commons Attribution 4.0', 'Creative Commons Attribution Share Alike 4.0', 'Do What The F * ck You Want To Public License', 'Educational Community License v2.0', 'Eclipse Public License 1.0', 'European Union Public License 1.1', 'GNU General Public License family', 'GNU Lesser General Public License family', 'GNU Lesser General Public License v3.0', 'ISC', 'LaTeX Project Public License v1.3c', 'Microsoft Public License', 'Open Software License 3.0', 'PostgreSQL License', 'SIL Open Font License 1.1', 'University of Illinois/NCSA Open Source License', 'zLib License'
];

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

// Standard Table of Contents Template for README
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
		name: 'Usage',
		checked: true,
	},
	{
		name: 'Features',
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

// Get all image files in the images directory
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
	let val = value;
	if (value instanceof Array) {
		val = value.join(', ');
	}

	if (val.trim() || val.trim().length > 0) {
		return true;
	}

	return utility.fontRed('Please enter some text!!!');
};

// check for valid emails
utility.checkEmail = (value) => {
	let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
	if (emailFormat.test(value.trim())) {
		return true;
	}

	return utility.fontRed('Please provide a valid email!!!');
};

// Perform find and replace operations
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

// Capitalizes the first letter of every word in a string
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

// Get the title of any section
utility.getTitle = (section) => {
	const aSection = !section ? 'subsection' : section;
	return {
		type: 'input',
		name: 'title',
		message: `Please enter the ${aSection} title?`,
		validate: utility.checkInput,
	};
};

// Generate the prompt for adding the table of contents
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

// Generate the prompt for adding custom sections 
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
				name: 'Exit this section, if done with sectional entry',
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

// Generate a playbook for attaching links to a note
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

// Generate the playbook for the Questions and License sections
utility.getMiscInfo = () => {
	return [
		{
			type: 'list',
			loop: true,
			name: 'license',
			message: 'Select a license you would like to include:',
			choices: licenses,
		},
		{
			type: 'input',
			name: 'github',
			message: "What's your GitHub username?",
			validate: utility.checkInput,
		},
		{
			type: 'input',
			name: 'email',
			message: "What's your email address?",
			validate: utility.checkEmail
		},
		{
			type: 'input',
			name: 'stack',
			message: "What's technology stack you used for this (comma separated data)?",
			validate: utility.checkInput,
			filter(val) {
				let techs = [];
				val.split(',').forEach(tech => {
					let addTech = tech.trim();
					if (addTech.length > 0) {
						techs.push(addTech.charAt(0).toUpperCase() + addTech.slice(1));
					}
				});

				return techs;
			}
		}
	];
}

// Export the utility API functions
module.exports = utility;
