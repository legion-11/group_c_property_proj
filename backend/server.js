const express = require('express');
const cors = require('cors');
const {mongoConnect} = require("./src/config/database");
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

const port = process.env.SERVER_PORT || 8001
mongoConnect(
    () => {
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    }
)
