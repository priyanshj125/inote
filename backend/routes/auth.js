const express = require('express');
const { model } = require('mongoose');
const User = require('../modules/User.js');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = ('priyanshlovejesikanomore')
var fetchuser=require('../middleware/fetchuser')
router.post('/createuser', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {

    // const user = await User(req.body);
    // user.save();

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        let users = await User.findOne({ email: req.body.email })
        if (users) {
            return res.status(400).json({ error: 'email already exists' })
        }

        //create a new user->
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({token:authtoken});
        // res.json(user)
    } catch (e) {                                     //catch the error
        console.error(e.message);
        res.status(500).send('Server Error')
    }
})

//autheintecagtoin user post/api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user =await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ error: 'email not found' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'password not match' })
        }
        const data = {
            user: {
                id: user._id

            }

        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json(authtoken)

    } catch (e) {                                     //catch the error
        console.error(e.message);
        res.status(500).send('internal Server Error')
    }


})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        console.log("this is ru");
        const userId = id// Ensure to use const keyword for defining userId
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router


