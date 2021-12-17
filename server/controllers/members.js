const models = require('../models');

module.exports = {
    delete: (req, res) => {
       res.status(204).json({message: 'member rejected'})
    } ,
    put: (req, res) => {
        res.status(204).json({message: 'member accepted'})
    } ,
    post: (req, res) => {
        res.status(201).json({message: 'successfully applied'})
    } ,
    get: (req, res) => {
        res.status(200).json({confirmed: [
            {username: 'kim', image: 'URL'}, 
            {username: 'kim', image: 'URL'}, 
            {username: 'kim', image: 'URL'}
            ]
        })
    } ,
}