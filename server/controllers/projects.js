const models = require('../models')
const { makejwt, solveToken } = require('./function')

module.exports = {
    project: {
        get: (req, res) => {
            models.items.get((error, result) => {
            })
        },
        delete: (req, res) => {
            models.items.get((error, result) => {
            })
        },
        put: (req, res) => {
            models.items.get((error, result) => {
            })
        }
    },
    post: {
        post: (req, res) => {
            models.items.get((error, result) => {
            })
        },
        get: (req, res) => {
            models.items.get((error, result) => {
            })
        },
    },
    private_post: {
        get: async (req, res) => {
           
        }
    }
}