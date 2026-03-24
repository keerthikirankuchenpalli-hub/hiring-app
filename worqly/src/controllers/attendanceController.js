const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { successResponse, errorResponse } = require('../middleware/responseHandler');

const checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;

        if (!employeeId) {
            return errorResponse(res, 'Employee ID is required', 400);
        }

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return errorResponse(res, 'Employee not found', 404);
        }

        const activeAttendance = await Attendance.findOne({ where: { employeeId, checkOut: null } });
        if (activeAttendance) {
            return errorResponse(res, 'Employee already has an active check-in', 409);
        }

        const attendance = await Attendance.create({ employeeId, checkIn: new Date() });
        return successResponse(res, attendance, 'Check-in successful', 201);
    } catch (error) {
        console.error('Error during check-in:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const checkOut = async (req, res) => {
    try {
        const { employeeId } = req.body;

        if (!employeeId) {
            return errorResponse(res, 'Employee ID is required', 400);
        }

        const attendance = await Attendance.findOne({ where: { employeeId, checkOut: null } });
        if (!attendance) {
            return errorResponse(res, 'No active check-in found for this employee', 404);
        }

        attendance.checkOut = new Date();
        await attendance.save();

        return successResponse(res, attendance, 'Check-out successful');
    } catch (error) {
        console.error('Error during check-out:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = { checkIn, checkOut };