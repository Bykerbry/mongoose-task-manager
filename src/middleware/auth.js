const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    console.log('auth is running...');
    try {
        console.log('in try');
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token, 'token');
        const decoded = jwt.verify(token, 'thisismysecret')
        console.log(decoded, "decoded");
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user, "user.....");
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        console.log(e);
        res.status(401).send({error: 'Please Authenticate.'})
    }
}

module.exports = auth