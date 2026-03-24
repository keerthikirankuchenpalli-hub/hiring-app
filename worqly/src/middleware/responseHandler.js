const successResponse = (res, payload, message = 'OK', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        payload,
        message
    });
};

const errorResponse = (res, message = 'Error', statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        payload: null,
        message
    });
};

module.exports = {
    successResponse,
    errorResponse
};