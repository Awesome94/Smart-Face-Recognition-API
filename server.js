const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

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
  database.users.push({
    id: 12345,
    name: name,
    email: email,
    entries: 0,
    password: password,
    joined: new Date()
  });
  res.status(201).json(database.users[database.users.length-1])
});

app.get('/profile/:id', (req, res)=>{
  const {id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if (!found){
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
const { id } = req.body;
let found = false;
database.users.forEach(user => {
  if(user.id === id){
    found = true;
    user.entries++
    return res.json(user.entries);
  }
  if(!found){
    res.status(404).json("User not found")
  }
})
})

app.listen(process.env.port  || 3000, function () {
  console.log("BASE URL : http://localhost:", this.address().port, app.settings.env);
  // console.log('sever statered on port', port)
})