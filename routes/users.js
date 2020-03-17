const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const api = express.Router();

//Create Users
// Route: api/users
api.post('/',
    [
        check('name', 'The name is necessary.').not().isEmpty(),
        check('surname', 'The surname is necessary.').not().isEmpty(),
        check('email', 'The email is necessary.').not().isEmpty(),
        check('password', 'The password is necessary.').not().isEmpty(),

        //Validations
        check('email', 'This email is incorrect format.').isEmail(),
        check('password', 'This password is short. Try with at least 6 characters').isLength({ min: 6 })
    ],
    userController.createUser
);

//Get User From ID
api.get('/:id',
    userController.getUser
);

//Get Users
api.get('/',
    userController.getUsers
);

//Update User
api.put('/:id',
    [
        check('name', 'The name is necessary.').not().isEmpty(),
        check('surname', 'The surname is necessary.').not().isEmpty(),
        check('email', 'The email is necessary.').not().isEmpty(),
        check('password', 'The password is necessary.').not().isEmpty(),

        //Validations
        check('email', 'This email is incorrect format.').isEmail(),
        check('password', 'This password is short. Try with at least 6 characters').isLength({ min: 6 })
    ],
    userController.updateUser
);

module.exports = api;