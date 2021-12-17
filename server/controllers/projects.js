const models = require('../models')

module.exports ={
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
    privite_post:{
        get: (req,res) => {
            models.items.get((error, result) => {
                
            })
        }
    }
}
