const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library
const { connectToDb, getDb } = require('./db');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

const app = express();
const port = 1000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    db = getDb();
  }
});

// Endpoint to handle registration form data
app.post('/api/user', (req, res) => {
  const postData = req.body;

  db.collection('users')
    .insertOne(postData)
    .then((result) => {
      res.status(201).json({ message: 'Data received successfully!' });
    })
    .catch((err) => {
      res.status(500).json({ error: "Couldn't add the document" });
    });
});

// Endpoint to handle GET requests for user data and generate JWT token
app.post('/api/auth/user', (req, res) => {
  const { email, password } = req.body;

  db.collection('users')
    .findOne({ email: email, password: password }) // Check both email and password
    .then((result) => {
      if (result) {
        const token = jwt.sign({ email: result.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
          message: 'User found',
          token: token, // Send the generated token
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
