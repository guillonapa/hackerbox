const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');

// load environment variables
require('./env');
const API_PORT = process.env.API_PORT;

// set the express app and the router
const app = express();
app.use(cors());
const router = express.Router();

// bodyParser, parses the request body to be a readable json format
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

/*
 * Gets the saved stories for the logged in user
 * where the request's query is defined by
 * { params: { user: 'user' } }
 */
router.get('/stories', (req, res) => {
    const hackerbox = path.join(os.homedir(), '.hackerbox');
    if (!fs.existsSync(hackerbox)) {
        return res.json({
            success: false,
            error: `The directory ${hackerbox} doesn't exist`
        });
    }

    const articles = path.join(hackerbox, 'articles.json');
    if (!fs.existsSync(articles)) {
        return res.json({
            success: false,
            error: `The file ${articles} doesn't exist`
        });
    }

    const contents = JSON.parse(fs.readFileSync(articles));

    return res.json({
        success: true,
        data: contents
    });

});

/*
 * Save a story for the logged in user
 */
router.post('/save', (req, res) => {
    const { title, description, url, imageUrl, source } = req.body;
    const hackerbox = path.join(os.homedir(), '.hackerbox');
    if (!fs.existsSync(hackerbox)) {
        return;
    }

    const articles = path.join(hackerbox, 'articles.json');
    if (!fs.existsSync(articles)) {
        return;
    }

    const contents = JSON.parse(fs.readFileSync(articles));
    contents.saved.push({
        title, 
        description,
        url,
        imageUrl,
        source
    });
    fs.writeFileSync(articles, JSON.stringify(contents));

});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));