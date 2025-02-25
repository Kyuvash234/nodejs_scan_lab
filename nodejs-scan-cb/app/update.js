const user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies['token']

    const data = jwt.verify(token, 'SECRET_KEY')
    if(!data){
        res.status(202).json({
            error: "Invalid token"
        })
    }else{
        user.updateOne({id: data.id}, {email: req.body.email, name: req.body.name})
            .then(doc => {
                res.status(200).json({message: 'Data Updated Successfully'})
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }
}