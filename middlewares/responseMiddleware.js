function responseMiddleware(req, res, next) {

    res.success = (data, status = 200, message = 'Success') => {
        res.status(status).json({
            data,
            error: false,
            status,
            message,
        });
    };

    res.error = (data = null, status = 500, message) => {
        res.status(status).json({
            data,
            error: true,
            status,
            message,
        });
    };
    
    next();
}

module.exports = responseMiddleware;