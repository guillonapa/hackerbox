
const os = require('os');
const path = require('path');
const fs = require('fs');

const initialMetadata = {
    'saved': [],
    'lists': []
}

console.log("Checking for ~/.hackerbox...");

const hackerbox = path.join(os.homedir(), '.hackerbox');
if (!fs.existsSync(hackerbox)) {
    console.log(`Creating ${hackerbox}`);
    fs.mkdirSync(hackerbox);
}

const articles = path.join(hackerbox, 'articles.json');
if (!fs.existsSync(articles)) {
    console.log(`Creating ${articles}`);
    fs.writeFileSync(articles, `${JSON.stringify(initialMetadata)}${os.EOL}`);
}