const body_parser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const allow_cross_domain = require('./app/allow-cross-domain');
const message_route = require('./app/routes/message.route.js');

const port = process.env.PORT || 8080;

const app = express();
app.use(helmet())
app.use(morgan('combined'))
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(allow_cross_domain);
app.use('/api/messages', message_route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
