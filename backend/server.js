const express = require('express');
const cors = require('cors');
const {mongoConnect, getSessionStore} = require("./src/config/database");
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());

app.use(require('express-session')({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 20 * 60 * 2  // 2 hours
    },
    store: getSessionStore(),
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    req.session.count = req.session.count ? ++req.session.count :  1
    res.send('Hello ' + JSON.stringify(req.session));
});


app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

const port = process.env.SERVER_PORT || 8001
mongoConnect().then(() => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err)
})
