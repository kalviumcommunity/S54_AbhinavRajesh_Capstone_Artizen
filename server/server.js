const express = require('express');
const cors = require('cors');
const routes = require('./route');
const DBconnection = require('./DBconnection');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 4000;
console.log('port: ', port);

app.use(express.json());
app.use(cors());


if (process.env.MONGO_URI) {
    DBconnection();
} else {
    console.log("MONGO URI is undefined");
}

app.use('/api', routes);

app.get('/ping', (req, res) => {
    res.send("pong");
});


app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});