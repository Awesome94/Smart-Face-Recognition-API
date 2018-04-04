const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db  = knex({
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
app.use(cors())

const database = {
  users : [
    {
      id: '123',
      name: 'john',
      email: 'jo@n.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1234',
      name: 'sally',
      email: 's@lly.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/sigin', (req, res) =>{
  if(req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password){
    res.json('success...')
  }else{
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req,res)=>{
  const{name, email, password} = req.body;
  db('users')
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  }).then(user => {
    res.json(user[0]);
  })
  .catch(err => res.status(400).json('unable to register'))
});

app.get('/profile/:id', (req, res)=>{
  const {id } = req.params;
  db.select('*').from('users').where({id})
  .then(user => {
    if (user.length){
      res.json(user)
    } else {
      res.status(404).json(`user ${id} not found`)
    }
    })
      .catch(err => res.status(400).json(`error getting user  ${id}`))
});

app.put('/image', (req, res) => {
const { id } = req.body;
let found = false;
db('users')
.where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {
  res.json(entries[0]);
})
.catch( err => res.status(400).json('Failed to get entries'))
})

app.listen(process.env.port  || 3000, function () {
  console.log("BASE URL : http://localhost:", this.address().port, app.settings.env);
  // console.log('sever statered on port', port)
})