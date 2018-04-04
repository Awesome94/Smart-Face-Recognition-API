const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image  = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'AWESOME',
    database: 'smartfacedb'
  }
});

db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*').from('users')
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(404).json(`user not found`)
      }
    })
    .catch(err => res.status(400).json(`error getting user`))
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)});

app.put('/image', (req, res) => { image.imageHandler(req, res, db)})

app.listen(process.env.port || 3000, function () {
  console.log("BASE URL : http://localhost:", this.address().port, app.settings.env);
  // console.log('sever statered on port', port)
})
