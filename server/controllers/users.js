const models = require('../models')

module.exports = {
  users: {
    get: (req, res) => {
      models.items.get((error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
    delete: (req, res) => {
      models.items.get((error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
  changeinfo: {
    put: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
  logout: {
    get: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
  signup: {
    post: (req, res) => {
      //   console.log(req.body)
      const { id, username, image, password, stack } = req.body
      models.users.create({
        username: username,
        email: id,
        password: password,
        image: image,
      })
      res.status(201).json({ message: `signup successed` })
    },
  },
  login: {
    post: (req, res) => {
      const userId = req.params.userId
      models.orders.get(userId, (error, result) => {
        if (error) {
          res.status(500).send('Internal Server Error')
        } else {
          res.status(200).json(result)
        }
      })
    },
  },
}
