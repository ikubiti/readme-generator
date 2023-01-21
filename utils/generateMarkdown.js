// import the necessary modules
const fs = require('fs');

// Data to assist in creation of badges
const badgeColor = ['brightgreen', 'red', 'blue', 'blueviolet', 'ff69b4', '9cf'];

const symbols = ["✅", "🏅", "💯", "☑️", "✔️", "☕", "🎉"];

// Select a random symbol or color
function getRandomFlag(source) {
  return source[Math.floor(Math.random() * source.length)];
}

// Generates the application's badge
function formatBadge(data) {
  let badge = `\n![license](https://img.shields.io/badge/License-${data.license}-${getRandomFlag(badgeColor)})`;

  badge += ` ![github](https://img.shields.io/badge/Github-${data.github}-${getRandomFlag(badgeColor)})`;

  data.stack.forEach(element => {
    badge += ` ![stack](https://img.shields.io/badge/${element}-${getRandomFlag(symbols)}-${getRandomFlag(badgeColor)})`;
  });

  return badge + "\n";
}

// Create license file if it doesn't exist
async function createLicense(data, fileName) {
  let content = `\n${data.license}\n\nCopyright (c) ${data.github}. All rights reserved.\n\nLicensed under the ${data.license}]license.\n\nYou may visit https://choosealicense.com/licenses/ for more information.\n`;

  try {
    await fs.promises.writeFile(fileName, content);
    console.log(`${fileName} file successfully created!`);
  } catch (err) {
    console.error(err);
  }
}

// Returns a valid license link
async function renderLicenseLink(data) {
  const file = 'LICENSE';
  // Check if the file exists in the current directory.
  try {
    await fs.promises.access(file);
  } catch (err) {
    await createLicense(data, file);
  }

  return `./${file}`;
}

// Generate markdown for README
function generateMarkdown(data) {
  return data.join('');
}

// Formats all headings in the README file
function formatTitle(data, level = 2) {
  if (level > 3) level = 3;
  const titleAddon = new Array(level);
  titleAddon.fill("#");
  let title = titleAddon.join("") + " " + data + "\n";

  if (level === 3) {
    title += '\n```';
  }

  return title;
}

// formats the table of contents
function formatTableOfContents(tableOfContents) {
  let content = [...tableOfContents];
  content.push('Questions');
  content.push('License');
  let contentTable = '\n' + formatTitle('Table of Contents');

  content.forEach(section => {
    contentTable += `\n- [${section}](#${section.toLowerCase()})`;
  });

  contentTable += '\n---\n';

  return contentTable;
}

// formats each section of the README file
function formatSection(title, content) {
  return `\n${formatTitle(title)}${content}\n`;
}

// formats links in any section of the README file
function formatLinks(note, links) {
  let formNote = note;
  for (let link in links) {
    const regex = new RegExp(`${link}`, 'g');
    let relink = `[${link}](${links[link]})`;
    formNote = formNote.replace(regex, `${relink}`);
  }

  return formNote;
}

// formats images in any section of the README file
function formatImage(imageInfo) {
  return `\n![${imageInfo.displayText}](${imageInfo.fullPath})`;
}

// Export the markdown functions that will generate the README formats
module.exports = {
  generateMarkdown: generateMarkdown,
  formatTitle: formatTitle,
  formatTableOfContents: formatTableOfContents,
  formatSection: formatSection,
  formatLinks: formatLinks,
  formatImage: formatImage,
  renderLicenseLink: renderLicenseLink,
  formatBadge: formatBadge,
};
