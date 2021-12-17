const models = require('../models');

module.exports = {
    users: {
        get: (req, res) => {
            models.items.get((error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        },
        delete: (req, res) => {
            models.items.get((error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        }
    },
    changeinfo: {
        put: (req, res) => {
            const userId = req.params.userId;
            models.orders.get(userId, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        },
    },
    logout: {
        get: (req, res) => {
            const userId = req.params.userId;
            models.orders.get(userId, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        },
    },
    signup: {
        post: (req, res) => {
            const userId = req.params.userId;
            models.orders.get(userId, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        },
    },
    login: {
        post: (req, res) => {
            const userId = req.params.userId;
            models.orders.get(userId, (error, result) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).json(result);
                }
            })
        },
    },
},
};



