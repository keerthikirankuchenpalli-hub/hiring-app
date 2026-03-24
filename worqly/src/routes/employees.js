const express = require('express');
const { check, query } = require('express-validator');
const { createEmployee, getAllEmployees } = require('../controllers/employeeController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// POST /employees - Only HR and Managers can create employees
router.post(
    '/',
    authenticateToken,
    authorizeRoles('HR', 'Manager'),
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Valid email is required'),
        check('role').isIn(['HR', 'Manager', 'Employee']).withMessage('Invalid role'),
        check('department').notEmpty().withMessage('Department is required')
    ],
    validate,
    createEmployee
);

// GET /employees - All authenticated users can view
router.get(
    '/',
    authenticateToken,
    [
        query('page').optional().isInt({ min: 1 }).toInt(),
        query('size').optional().isInt({ min: 1, max: 100 }).toInt()
    ],
    validate,
    getAllEmployees
);

module.exports = router;