# PROFESSIONAL README GENERATOR

![license](https://img.shields.io/badge/License-MIT-red) ![github](https://img.shields.io/badge/Github-ikubiti-blueviolet) ![stack](https://img.shields.io/badge/Node-✅-brightgreen) ![stack](https://img.shields.io/badge/Javascript-✔️-red) ![stack](https://img.shields.io/badge/Git-✅-brightgreen)


## Description

This application is a time-saving tool for the developer to consistently reproduce high-quality README.md file for their application. It also aides the developer to quickly and easily create a README file by using this command-line application to generate one. This allows the project creator to devote more time to working on the project.

THIS README.md FILE WAS CREATED WITH THIS APPLICATION!!

My objectives for this application is based on the following user story and acceptance criteria:


### User Story

```
AS A developer
I WANT a README generator
SO THAT I can quickly create a professional README for a new project


```

### Acceptance Criteria

```
GIVEN a command-line application that accepts user input
- WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
- WHEN I enter my project title
THEN this is displayed as the title of the README
- WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
- WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
- WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
- WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
- WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README.


```


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

---

## Installation

To run this application, you need to have node.js installed on your computer. All packages and dependencies for running this application is found in the package.json file.
To automatically install all the dependencies, run `npm install or npm i' in the root directory of this application.


## Usage

The application will be invoked by using the following command in the root directory+:

- node index.js

Once invoked, please follow screen prompts to generate your README.md file.
[The Professional README Generator](https://drive.google.com/file/d/1HclfOwS2eFKwIZRUbjL5CpTtda9Q_E41/view?usp=sharing) demonstration link also provides a demonstrates the application's usage.


The images below shows some of the application's prompts and feedback.


![Application Introduction](./images/App-Intro1.png)

The prompts for creating the table of contents.


![Create Table of Contents](./images/Title-TableOfContents-Prompt2.png)

The prompt to create the Description section. These prompts are generic for any section.


![Add Section Content](./images/Section-prompts3.png)


![Hints being displayed for each prompt](./images/Section-Prompts-Selection4.png)


![Adding a subsection](./images/Add-Subsection5.png)

![User selects to add an image](./images/add-image6.png)

![Prompt to add image](./images/add-image-prompt7.png)

![User about to select a license](./images/Selecting-a-license8.png)


![App successfully created the README file](./images/App-exit-message9.png)


## Features

In addition to fulfilling the above requirements, the application also has the following features:

1.  The user isn't restricted to a single README.md template format, the user can add or create their custom README structure when prompted to construct the table of contents.
2.  The user can create subsections under any section to add additional content as illustrated in the description of this README file.
3.  The user can add links and images to the file as illustrated in this file.
4.  The app applies some formatting to the titles of all the sections irrespective of the user's input.
5.  The app generates a minimal LICENSE file if it doesn't already file.


## Contributing

The user can add instructions for their application here. This section is optional and may be omitted by the user.


## Tests

The user can add instructions for testing their application here. This application has no test presently but they will be added during revision.


## Questions

If you have any questions, please feel free to reach out to me at: [ikubiti@icloud.com](mailto:ikubiti@icloud.com).

Alternatively, you may find my profile on GitHub at [https://github.com/ikubiti](https://github.com/ikubiti).

---

## License

Copyright (c) ikubiti. All rights reserved.

Licensed under the [MIT](./LICENSE) license.
