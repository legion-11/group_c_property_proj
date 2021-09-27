const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {findByUserName, findByUserId} = require("../model/user")
const validPassword = require("../lib/passwordUtils").validPassword;

const customFields = {
    _usernameField: "username",
    _passwordField: "password"
}

const verifyCallback = (username, password, cb) => {
    findByUserName(username)
        .then((user) => {
            if (!user) { return cb(null, false) }
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        })
        .catch((err) => {
            cb(err);
        });
}
const strategy = new LocalStrategy(customFields, verifyCallback)
passport.use(strategy);

passport.serializeUser((user, cb) =>
    {cb(null, user._id);}
);

passport.deserializeUser((id, cb) => {
     findByUserId(id)
         .then((user) => {cb(null, user)})
         .catch((err) => {return cb(err)});
});