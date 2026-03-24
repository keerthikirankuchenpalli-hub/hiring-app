require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { initializeDatabase } = require('./config/database');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

const startServer = async () => {
    const sequelize = await initializeDatabase();

    // Load models after Sequelize instance is initialized
    require('./models/Employee');
    require('./models/Attendance');
    require('./models/Leave');

    try {
        await sequelize.sync();
        console.log('Database synced');
    } catch (err) {
        console.error('Error syncing database:', err);
        throw err;
    }

    const app = express();
    const PORT = config.appPort;

    // ✅ Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

    // ✅ Health Check Route (VERY IMPORTANT)
    app.get('/health', (req, res) => {
        res.json({
            success: true,
            message: "Worqly API is running 🚀"
        });
    });

    // ✅ API Routes
    app.use('/api', routes);

    // ✅ Serve static frontend
    app.use(express.static(path.join(__dirname, '../frontend')));

    // ✅ Root route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });

    // ❗ 404 Handler (must be AFTER all routes)
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            payload: null,
            message: 'Route not found'
        });
    });

    // ❗ Global Error Handler (last)
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Worqly server is running on port ${PORT}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});