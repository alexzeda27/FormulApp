const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

//Create users
exports.createUser = async (req, res) => {
    //Review if exists errores
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    //Extract email and password
    const { email, password } = req.body;

    try {
        //Review if user is unique
        let user = await User.findOne({ email });
        if(user) return res.status(400).json({ msg: 'This user has already exist.' });

        //Create user
        user = new User(req.body);

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //Save user
        await user.save();

        //Create JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Sign JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hour
        }, (error, token) => {
            if(error) throw error;
            //Show JWT
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Several Error.');
    }
}

//Get users from ID
exports.getUser = async (req, res) => {
    try {
        //Review ID
        let user = await User.findById(req.params.id).sort({ name: 1 });

        //If user not exist
        if(!user) return res.status(404).json({ msg: 'This user not exist. Try with other user.' });

        //Show user
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Several Error.');
    }
}

//Get users
exports.getUsers = async (req, res) => {
    try {
        //Review all users
        let users = await User.find().sort({ name: 1 });

        //If not exist any users
        if(!users) return res.status(404).json({ msg: 'Not exists any users yet.' });

        //Show all users
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Several Error.');
    }
}

//Update users
exports.updateUser = async (req, res) => {
    //Review if exists errores
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    //Extract user from body
    const { name, surname, email, password } = req.body;
    const newUser = {};

    if(name, surname, email, password) {
        newUser.name = name;
        newUser.surname = surname;
        newUser.email = email;
        newUser.password = password;
    }

    try {
        //Review ID
        let user = await User.findById(req.params.id);

        //If user not exist
        if(!user) return res.status(404).json({ msg: 'This user not exist. Try with other user.' });

        //Update user
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: newUser }, { new: true });
        res.json({ msg: 'User ' + user.name + ' updated successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Several Error.');
    }
}