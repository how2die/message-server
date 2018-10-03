const bodyParser = require('body-parser');
const express = require('express');
const messageRouter = require('./routes/messages.js');
const mongoose = require('mongoose');
const morgan = require('morgan')

const port = process.env.PORT || 8080;
const db = mongoose.connect('mongodb://user:password123@ds117691.mlab.com:17691/messages', { useNewUrlParser: true });

const app = express();

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/messages', messageRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
