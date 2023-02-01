const error = (error, req, res, next) => {
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: error.errors[0].message
        })
    } else if (error.name == 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
            message: 'Error foreign key'
        })
    } else if (error.name == 'EmailPassEmpty') {
        res.status(400).json({
            message: 'Email or password cannot be empty'
        })
    } else if (error.name == 'wishlisted') {
        res.status(400).json({
            message: 'Product already in the wishlist'
        })
    } else if (error.name == 'NoToken') {
        res.status(401).json({
            message: 'Please login first'
        })
    } else if (error.name == 'invalid_email/password') {
        res.status(401).json({
            message: 'Invalid email or password'
        })
    } else if (error.name == 'Unauthorized' || error.name == 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid token'
        })
    } else if (error.name == 'Forbidden') {
        res.status(403).json({
            message: 'Access Denied'
        })
    } else if (error.name == 'NotFound') {
        res.status(404).json({
            message: 'Data not found'
        })
    } else {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = error