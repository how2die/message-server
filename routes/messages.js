const express = require('express');
const Message = require('../models/message.js');
const isValid = require('./mongo-id-validator.js');
const allowCrossDomain = require('./allow-cross-domain.js');

const router = express.Router();
router.use(allowCrossDomain);

router.post('/', (req, res) => {
    let message = new Message(req.body);
    message.save((err, created) => {
        if (err) { 
            res.status(500).send(err); 
        } else {
            res.status(201).send(created);
        }
    });
});

router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) { 
            res.status(500).send(err); 
        } else {
            res.status(200).send(messages);
        }
    })
});

router.get('/:messageId', (req, res) => {
    if (!isValid(req.params.messageId)) { 
        res.sendStatus(404)
        return;
    }

    Message.findById(req.params.messageId, (err, message) => {
        if (err) { 
            res.status(500).send(err); 
        } else {
            message ? res.status(200).send(message) : res.sendStatus(404);
        }
    })
});

router.put('/:messageId', (req, res) => {
    if (!isValid(req.params.messageId)) { 
        res.status(422).send("Invalid id"); 
        return;
    }

    Message.findByIdAndUpdate(req.params.messageId, req.body, { upsert: true }, (err, existing) => {
        if (err) { 
            res.status(500).send(err); 
        } else {
            res.sendStatus(existing ? 200 : 201);
        }
    });
});

router.delete('/:messageId', (req, res) => {
    if (!isValid(req.params.messageId)) { 
        res.sendStatus(204);
        return;
    }

    Message.findByIdAndRemove(req.params.messageId, err => {
        if (err) { 
            res.status(500).send(err); 
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;
