import User from '../models/User';

export const createUser = (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then(createdResp => {
      return res.status(200).json({createdResp})
    }).catch((error) => setImmediate(() => {
      res.status(500).json({error: "internal server error"})
    }))
}

export const getUsers = (req, res) => {
  User.find().exec()
    .then(users => {
      return res.status(200).json({users})
    }).catch((error) => setImmediate(() => res.status(500).json({error: "internal server error"})))
}

