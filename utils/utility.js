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

// Determines the input type and subsequent questions
utility.inputType = (value, section) => {
	const content = !value ? 'content' : value;
	const questionContent = !section ? "Select the input type?" : `Select the input type for section "${section}"?`;

	const newQuestion = {
		type: 'expand',
		name: content,
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
				value: 'image',
			},
		],
	};

	return newQuestion;
};

// Get a note based on user input
utility.note = (value, inputType) => {
	const content = !value ? 'multiText' : value;
	// const soFar = answers[inputType];
	// console.log(soFar);

	const newQuestion = {
		type: 'editor',
		name: content,
		message: utility.fontYellow('Please add your content to this note!!'),
		validate(text) {
			if (text.split('\n').length < 3) {
				return 'Must be at least 3 lines.';
			}

			return true;
		},
		waitUserInput: true,
		when(answers) {
			return answers[inputType] === 'note' || answers[inputType] === 'noteLink';
		}

	};
	return newQuestion;
};

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

module.exports = utility;
