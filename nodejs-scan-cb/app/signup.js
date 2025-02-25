const user = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
    const {name, email, password} = req.body
    new user({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
    }).save()
        .then(result => {
            res.status(201).json({
                msg: "Account Created Successfully"
            })
        })
        .catch(err => {
            res.status(202).json({
                msg: err
            })
        })
    
}