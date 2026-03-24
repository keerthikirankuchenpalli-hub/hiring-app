const express = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const validate = require('../middleware/validation');

const router = express.Router();

// POST /login
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Valid email is required'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    validate,
    login
);

module.exports = router;