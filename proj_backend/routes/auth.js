const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { logout, signup, login, isSignedIn } = require('../controllers/auth')

router.post('/signup', [
    //validation
    check('username').isLength({ min : 3}).withMessage('Username must be at least 3 characters'),
    check('email').normalizeEmail().isEmail().withMessage('Email address required'),
    check('password').not().isEmpty().withMessage('Password required').isLength({ min : 5 }).withMessage('Password too short').isLength({ max : 12 }).withMessage('Password too long'),
], signup)

router.post('/login', [
     //validation
    check('email').not().isEmpty().withMessage('Email required').normalizeEmail().isEmail().withMessage('Email does not exist'),
    check('password').isLength({ min : 5}, { max : 15}).withMessage('Incorrect password')
], login)

router.get('/logout', logout)

module.exports = router