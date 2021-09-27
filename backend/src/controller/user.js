const {insertUser, findByUserName} = require("../model/user")
const passwordUtils = require('../lib/passwordUtils');

const addUser = async (req, res) => {
    const user = await findByUserName(req.body.username)
    console.log("create user "+ req.body)
    if (user) {
        res.json({success: false, msg: 'username already in use'});
    }
    console.log("create user "+ req.body)
    const saltHash = passwordUtils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = {
        username: req.body.username,
        hash: hash,
        salt: salt
    };

    try {
        insertUser(newUser)
            .then((user) => {
                console.log(user)
            })
            .catch((err) => {
                console.log(err)
            });
        res.redirect('/signIn')
    } catch (err) {
        res.json({success: false, msg: err});
    }

};

module.exports = {addUser};
