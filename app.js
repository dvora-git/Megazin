const express = require('express');
const util = require('util');
const app = express();
// const read = util.promisify(fs.readFile);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
app.use(bodyParser.json());
const router = require('./routes/api')
app.use(router)
// app.set('view engine', 'ejs')

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected");
    })
    .catch(err => {
        console.log('error connecting');
    })

//app.use(checkSecret)

function checkSecret(req, res, next) {
    const myToken = jwt.verify(req.headers['authorization'], process.env.SECRET_JWT)
    console.log("hello checkSecret!");
    if (myToken)
        return next()
    else {
        res.send('error in token')
    }
}

app.use(mid)
function mid(req, res, next) {
    console.log("mid!");
    return next()
}

app.listen(3003, () => {
    console.log("listening on port 3003");
})