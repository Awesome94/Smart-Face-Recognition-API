const express = require('express');
const app = express();

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
  res.send('this is working');
})

app.post('/sigin', (req, res) =>{
  if(req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password){
    res.json('success...')
  }else{
    res.status(400).json('error logging in')
  }
})

app.listen(process.env.port  || 3000, function () {
  console.log("BASE URL : http://localhost:", this.address().port, app.settings.env);
  // console.log('sever statered on port', port)
})