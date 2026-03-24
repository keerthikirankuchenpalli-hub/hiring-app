const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../middleware/responseHandler');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, 'Email and password are required', 400);
        }

        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        const token = jwt.sign(
            {
                employeeId: employee.id,
                email: employee.email,
                role: employee.role,
                name: employee.name
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return successResponse(res, {
            token,
            user: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                department: employee.department
            }
        }, 'Login successful');
    } catch (error) {
        console.error('Error during login:', error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = {
    login
};