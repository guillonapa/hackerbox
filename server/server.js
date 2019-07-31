const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const request = require('request');
const SavedStories = require('./models/savedStories');
const User = require('./models/users');
const validateRegisterInput = require('./validation/registerValidation');
const validateLoginInput = require('./validation/loginValidation');

// environmental variables
require('./config/dotenv-config');
const API_PORT = process.env.API_PORT;
const dbRoute = process.env.DB_ROUTE;
const secretOrKey = process.env.KEY_OR_SECRET;
const newsapikey = process.env.NEWS_API_KEY;

// express app
const app = express();

// use cors
app.use(cors());

// express router
const router = express.Router();

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// mongodb database
const db = mongoose.connection;

// logging when connection open
db.once('open', () => console.log('Connected to the database'));

// logging on any error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// (optional) only made for logging and
app.use(logger('dev'));

/*
 * Gets the saved stories for the logged in user
 * where the request's query is defined by
 * { params: { user: 'user' } }
 */
router.get('/saved-stories', (req, res) => {
  SavedStories.find(
    {
      user: req.query.user
    },
    (err, data) => {
      if (err)
        return res.json({
          success: false,
          error: err
        });
      return res.json({
        success: true,
        data
      });
    }
  );
});

/*
 * Save a story for the logged in user
 */
router.post('/save', (req, res) => {
  const { title, description, url, imageUrl, source, user } = req.body;
  const story = new SavedStories();
  story.user = user;
  story.title = title;
  story.description = description;
  story.link = url;
  story.linkToImage = imageUrl;
  story.source = source;

  story.save(err => {
    if (err)
      return res.json({
        success: false,
        error: err
      });
    return res.json({
      success: true
    });
  });
});

/*
 * Create an account for a new user
 */
router.post('/signup', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.username
  }).then(user => {
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (innerErr, hash) => {
          if (innerErr) throw innerErr;
          newUser.password = hash;
          newUser
            .save()
            .then(savedUser => res.json(savedUser))
            .catch(caughtError => console.log(caughtError));
        });
      });
    }
  });
});

/*
 * Login a new user
 */
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        emailnotfound: 'Email not found'
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res.status(400).json({
          passwordincorrect: 'Password incorrect'
        });
      }
    });
  });
});

/*
 * Get stories from NEWS API
 */
router.get('/stories', (req, res) => {
  const { source, country, pageSize } = req.query;
  let url;
  if (source === null || source === '') {
    url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsapikey}&pageSize=${pageSize}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${newsapikey}&pageSize=${pageSize}`;
  }
  request(url, (error, response, body) => {
    if (error) {
      return res.json({
        success: false
      });
    }
    return res.json({
      success: true,
      stories: JSON.parse(body).articles
    });
  });
});

/*
 * Get news sources from NEWS API
 */
router.get('/sources', (req, res) => {
  const url = `https://newsapi.org/v2/sources?language=en&apiKey=${newsapikey}`;
  request(url, (error, response, body) => {
    if (error) {
      return res.json({
        success: false
      });
    }
    return res.json({
      success: true,
      sources: JSON.parse(body).sources
    });
  });
});

// append /api for our http requests
app.use('', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
