const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');
const sequelize = getSequelize();

const Leave = sequelize.define('Leave', {
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
    fromDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    toDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'PENDING'
    }
}, {
    timestamps: true
});

// Define associations
Leave.associate = (models) => {
    Leave.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
        as: 'employee'
    });
};

module.exports = Leave;