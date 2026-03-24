const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const { successResponse, errorResponse } = require('../middleware/responseHandler');

const applyLeave = async (req, res) => {
    try {
        const { employeeId, fromDate, toDate, reason } = req.body;

        if (!employeeId || !fromDate || !toDate || !reason) {
            return errorResponse(res, 'All fields are required', 400);
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (from >= to) {
            return errorResponse(res, 'From date must be before to date', 400);
        }

        if (from < today) {
            return errorResponse(res, 'Cannot apply leave for past dates', 400);
        }

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return errorResponse(res, 'Employee not found', 404);
        }

        const leave = await Leave.create({ employeeId, fromDate, toDate, reason, status: 'PENDING' });
        return successResponse(res, leave, 'Leave application submitted successfully', 201);
    } catch (error) {
        console.error('Error applying for leave:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const approveLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const leave = await Leave.findByPk(leaveId);
        if (!leave) {
            return errorResponse(res, 'Leave application not found', 404);
        }

        if (leave.status !== 'PENDING') {
            return errorResponse(res, 'Leave application has already been processed', 400);
        }

        leave.status = 'APPROVED';
        await leave.save();
        return successResponse(res, leave, 'Leave approved successfully');
    } catch (error) {
        console.error('Error approving leave:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const rejectLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const leave = await Leave.findByPk(leaveId);
        if (!leave) {
            return errorResponse(res, 'Leave application not found', 404);
        }

        if (leave.status !== 'PENDING') {
            return errorResponse(res, 'Leave application has already been processed', 400);
        }

        leave.status = 'REJECTED';
        await leave.save();
        return successResponse(res, leave, 'Leave rejected successfully');
    } catch (error) {
        console.error('Error rejecting leave:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.findAll({
            include: [{
                model: Employee,
                as: 'employee',
                attributes: ['id', 'name', 'email', 'department']
            }],
            order: [['createdAt', 'DESC']]
        });

        return successResponse(res, leaves, 'Leaves retrieved successfully');
    } catch (error) {
        console.error('Error retrieving leaves:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = { applyLeave, approveLeave, rejectLeave, getAllLeaves };