const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');
const sequelize = getSequelize();

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.ENUM('HR', 'Manager', 'Employee'),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

// Define associations
Employee.associate = (models) => {
    Employee.hasMany(models.Attendance, {
        foreignKey: 'employeeId',
        as: 'attendances'
    });
    Employee.hasMany(models.Leave, {
        foreignKey: 'employeeId',
        as: 'leaves'
    });
};

module.exports = Employee;