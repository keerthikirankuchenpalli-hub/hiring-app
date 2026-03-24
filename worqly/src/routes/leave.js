const express = require('express');
const { check } = require('express-validator');
const { applyLeave, approveLeave, rejectLeave, getAllLeaves } = require('../controllers/leaveController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// POST /leaves/apply - Any authenticated employee can apply
router.post(
    '/apply',
    authenticateToken,
    [
        check('employeeId').isInt({ min: 1 }).withMessage('employeeId is required'),
        check('fromDate').isISO8601().withMessage('Valid fromDate is required'),
        check('toDate').isISO8601().withMessage('Valid toDate is required'),
        check('reason').notEmpty().withMessage('Reason is required')
    ],
    validate,
    applyLeave
);

// PUT /leaves/:leaveId/approve - Only HR and Managers can approve
router.put('/:leaveId/approve', authenticateToken, authorizeRoles('HR', 'Manager'), approveLeave);

// PUT /leaves/:leaveId/reject - Only HR and Managers can reject
router.put('/:leaveId/reject', authenticateToken, authorizeRoles('HR', 'Manager'), rejectLeave);

// GET /leaves - All authenticated users can view
router.get('/', authenticateToken, getAllLeaves);

module.exports = router;