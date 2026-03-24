const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    appPort: process.env.PORT || 3005,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    dbUrl: process.env.DATABASE_URL || 'sqlite:./database.sqlite',
    nodeEnv: process.env.NODE_ENV || 'development'
};