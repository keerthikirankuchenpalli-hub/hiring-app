const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL || 'sqlite:./database.sqlite';

let sequelize;

if (dbUrl.startsWith('sqlite:')) {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbUrl.replace('sqlite:', ''),
        logging: false
    });
} else {
    sequelize = new Sequelize(dbUrl, {
        dialect: 'postgres',
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to database:', error.message || error);
        throw error;
    }

    return sequelize;
};

const getSequelize = () => sequelize;

module.exports = {
    initializeDatabase,
    getSequelize
};