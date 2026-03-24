const express = require('express');
const { check } = require('express-validator');
const { checkIn, checkOut } = require('../controllers/attendanceController');
const { authenticateToken } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

const employeeIdValidation = [
    check('employeeId').isInt({ min: 1 }).withMessage('employeeId is required and must be a positive integer')
];

// POST /attendance/checkin - Authenticated users can check in
router.post('/checkin', authenticateToken, employeeIdValidation, validate, checkIn);

// POST /attendance/checkout - Authenticated users can check out
router.post('/checkout', authenticateToken, employeeIdValidation, validate, checkOut);

module.exports = router;