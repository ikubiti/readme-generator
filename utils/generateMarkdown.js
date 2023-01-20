
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

`;
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

function formatSection(title, content) {
  return `\n${formatTitle(title)}${content}\n`;
}

function formatLinks(note, links) {
  let formNote = note;
  for (let link in links) {
    const regex = new RegExp(`${link}`, 'g');
    let relink = `[${link}](${links[link]})`;
    formNote = formNote.replace(regex, `${relink}`);
  }

  return formNote;
}

function formatImage(imageInfo) {
  return `![${imageInfo.displayText}](${imageInfo.fullPath})`;
}


// Export the markdown functions that will generate the README formats
module.exports = {
  generateMarkdown: generateMarkdown,
  formatTitle: formatTitle,
  formatTableOfContents: formatTableOfContents,
  formatSection: formatSection,
  formatLinks: formatLinks,
  formatImage: formatImage,
};
