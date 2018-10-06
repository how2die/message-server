const express = require('express');
const { Message } = require('../sequelize')
const allowCrossDomain = require('./allow-cross-domain');

const router = express.Router();
router.use(allowCrossDomain);

const validId = id => { return !isNaN(id); };

router.post('/', (req, res) => {
    Message
        .create(req.body)
        .then(saved => { res.status(201).send(saved) })
        .catch(err => { res.status(500).send(err) });
});


router.get('/', (req, res) => {
    Message
        .findAll()
        .then(messages => { res.status(200).send(messages) })
        .catch(err => { res.status(500).send(err) });
});


router.get('/:messageId', (req, res) => {
    if (!validId(req.params.messageId)) {
        res.sendStatus(404);
        return;
    }

    Message
        .findById(req.params.messageId)
        .then(message => { message ? res.status(200).send(message) : res.sendStatus(404); })
        .catch(err => { res.status(500).send(err) });
});


router.put('/:messageId', (req, res) => {
    if (!validId(req.params.messageId)) {
        res.status(422).send("Invalid id");
        return;
    }

    message = req.body;
    req.body.id = req.params.messageId;
    
    Message
        .upsert(message)
        .then(created => { res.sendStatus(created ? 201 : 200) })
        .catch(err => { res.status(500).send(err); });
});

router.delete('/:messageId', (req, res) => {
    if (!validId(req.params.messageId)) {
        res.sendStatus(204);
        return;
    }

    Message
        .destroy({ where: { id: req.params.messageId } })
        .then(() => { res.sendStatus(204); })
        .catch(err => { res.status(500).send(err); });
});

module.exports = router;
