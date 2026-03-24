const Employee = require('../models/Employee');
const { successResponse, errorResponse } = require('../middleware/responseHandler');

const createEmployee = async (req, res) => {
    try {
        const { name, email, role, department } = req.body;

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return errorResponse(res, 'Employee with this email already exists', 409);
        }

        const employee = await Employee.create({ name, email, role, department });

        return successResponse(res, employee, 'Employee created successfully', 201);
    } catch (error) {
        console.error('Error creating employee:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 20;
        const limit = parseInt(size, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const { rows: employees, count } = await Employee.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);

        return successResponse(res, {
            items: employees,
            meta: {
                page: parseInt(page, 10),
                size: limit,
                total: count,
                totalPages
            }
        }, 'Employees retrieved successfully');
    } catch (error) {
        console.error('Error retrieving employees:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees
};