const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then((doc) => {
            if (!doc) {
                res.status(202).json({
                    err: 'Email or password is wrong',
                })
            } else {
                if (bcrypt.compareSync(req.body.password, doc.password)) {
                    const data = jwt.sign(
                        {
                            id: doc._id,
                        },
                        'SECRET_KEY'
                    )
                    res.cookie('token', data, {
                        maxAge: 3600 * 1000,
                        sameSite: true,
                        secure: true,
                        httpOnly: true,
                    })

                    res.status(200)
                    res.send()
                } else {
                    res.status(202).json({
                        err: 'Email or password is wrong',
                    })
                }
            }
        })
        .catch((err) => {})
}
