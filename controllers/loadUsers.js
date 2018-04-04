const loadUsers = (db)=>(req, res)=>{
  db.select('*').from('users')
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(404).json(`user not found`)
      }
    })
    .catch(err => res.status(400).json(`error getting user`))
}
module.exports = {
  loadUsers: loadUsers
};