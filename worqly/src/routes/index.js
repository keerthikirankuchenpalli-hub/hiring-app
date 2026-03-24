const express = require('express');
const healthRouter = require('./health.js');
const authRouter = require('./auth.js');
const employeeRouter = require('./employees.js');
const attendanceRouter = require('./attendance.js');
const leaveRouter = require('./leave.js');

const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/employees', employeeRouter);
router.use('/attendance', attendanceRouter);
router.use('/leaves', leaveRouter);

module.exports = router;