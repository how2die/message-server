const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan')
const messageRouter = require('./routes/messages.js');

const port = process.env.PORT || 8080;

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/messages', messageRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
