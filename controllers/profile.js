const profileHandler = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(404).json(`user ${id} not found`)
      }
    })
    .catch(err => res.status(400).json(`error getting user  ${id}`))
}
module.exports = {
  profileHandler: profileHandler
};