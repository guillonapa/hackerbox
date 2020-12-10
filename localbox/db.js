const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pool = require('pg').Pool;
const NewsAPI = require('./NewsApi');

// environment
const ENV = process.env;

// get the database url to connect to
const connectionString = !ENV.DATABASE_URL ? `postgresql://${ENV.USER}@localhost:5432/${ENV.DB_NAME}` : ENV.DATABASE_URL;
console.log("Database URL:", connectionString);

// get ssl configuration
const ssl = !ENV.LOCAL_HACKERBOX ? { rejectUnauthorized: false } : false;
console.log("SSL for DB Connection:", ssl);

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const pageSize = 30;

// configure db pool
const pool = new Pool({
    connectionString,
    ssl
});

// function to query database
function query(text, params) {
    return pool.query(text, params);
}

// the express api app
const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

/**
 * Get the secret person for the specific person and event based on the
 * personal key and the event key passed in the parameters.
 */
app.get('/stories', async (req, res) => {
    try {
        // get the person who's key is the same as the one for the person's matched key
        const result = await query(`SELECT * FROM stories`);
        // make sure the a single row is returned
        const { rows } = result;
        return res.json({
            success: true,
            data: rows
        });
    } catch (err) {
        console.log(err);
        res.send("An internal error has occurred. Please contact the administrator for further help.");
    }
});

app.get('/home', async (req, res) => {
    try {
        const response = await newsapi.v2.sources({ language: "en" });
        if (response.status === 'ok') {
            return res.json({
                success: true,
                data: {
                    listOfSources: response.sources
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.send("An internal error has occurred. Please contact the administrator for further help.");
    }
});

app.get('/news/:country/*?', async (req, res) => {
    console.log('params...', req.params);
    const { country } = req.params;
    const source = req.params['0'];
    console.log('The country:', country);
    console.log('The source:', source);

    try {
        let options;
        // call the API and get stories for default
        if (source === null || source === "" || !source) {
          options = { country, pageSize };
        } else {
          options = { sources: [source], pageSize }
        }
        console.log('The options:', options);
        const response = await newsapi.v2.topHeadlines(options);
        if (response.status === 'ok') {
            return res.json({
                success: true,
                data: {
                    source,
                    articles: response.articles
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.send("An internal error has occurred. Please contact the administrator for further help.");
    }
});

/**
 * Will create an event with the name and people array passed in the
 * body of the request. The key of the event is returned or an empty
 * string if any error occurred.
 */
app.post('/save', async (req, res) => {
    try {
        const { title, description, url, imageUrl, source } = req.body

        // add event to events table
        await query('INSERT INTO stories (title, description, url, imageUrl, source) VALUES ($1, $2, $3, $4, $5)', [title, description, url, imageUrl, source]);
        // return the key of the event
        res.send('200');
    } catch (err) {
        console.log(err)
        res.send('400');
    }
});

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// get a port for the app to listen at
const port = ENV.PORT || 3080;

// start listening for rest calls
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
