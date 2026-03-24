const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');
const sequelize = getSequelize();

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Employees',
            key: 'id'
        }
    },
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

// Define associations
Attendance.associate = (models) => {
    Attendance.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
        as: 'employee'
    });
};

module.exports = Attendance;