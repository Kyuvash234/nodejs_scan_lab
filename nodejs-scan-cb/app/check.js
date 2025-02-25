const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    try {
        const data = jwt.verify(req.cookies['token'], 'SECRET_KEY')
        res.status(200).json({signedIn: data.id !== null && data.id !== undefined})
    } catch (error) {        
        res.status(200).json({signedIn: false})
    }
    
}