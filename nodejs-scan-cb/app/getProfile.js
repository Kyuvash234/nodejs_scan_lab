const jwt = require("jsonwebtoken")
const user = require('../models/user')

module.exports = (req, res, next) => {
    const token = req.cookies['token']
    if(!token){
        res.status(400).json({error: "No token available"})
        return
    }
    
    try{
        const data = jwt.verify(token, 'SECRET_KEY')
        if(!data){
            res.status(400).json({
                error: "Invalid token"
            })
        }else{
            user.findOne({_id: data.id})
                .then((result) => {
                    if(!result){
                        res.status(202).send()
                    }else{
                        res.status(200).json({
                            name: result.name,
                            email: result.email
                        })
                    }
                }).catch((err) => {
                    
                });
        }
    }catch(err){
        res.status(202).send()
    }

    
}