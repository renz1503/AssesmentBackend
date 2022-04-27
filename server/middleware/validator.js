const jwt  = require('jsonwebtoken')

const middlewares = {
    isAuthenticated: function (req, res, next) {
        const token = req.headers.token
        
        try{
            const auth = jwt.verify(token, process.env.SECRET)
            if (auth.id) return next();
            res.status(401).json({ message: 'You must login' })
        }
        catch(e){
            res.status(401).json({ message: 'Something went wrong. Try again later.' })
        }        
    }
};

module.exports = middlewares;