const { Message } = require('../config/sequelize')

const validId = id => { return !isNaN(id); };

exports.create = (req, res) => {
    Message
        .create(req.body)
        .then(saved => { res.status(201).send(saved) })
        .catch(err => { res.status(500).send(err) });
};


exports.findAll = (req, res) => {
    Message
        .findAll()
        .then(messages => { res.status(200).send(messages) })
        .catch(err => { res.status(500).send(err) });
};


exports.findById = (req, res) => {
    if (!validId(req.params.messageId)) {
        res.sendStatus(404);
        return;
    }

    Message
        .findById(req.params.messageId)
        .then(message => { message ? res.status(200).send(message) : res.sendStatus(404); })
        .catch(err => { res.status(500).send(err) });
};


exports.update = (req, res) => {
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
};

exports.delete = (req, res) => {
    if (!validId(req.params.messageId)) {
        res.sendStatus(204);
        return;
    }

    Message
        .destroy({ where: { id: req.params.messageId } })
        .then(() => { res.sendStatus(204); })
        .catch(err => { res.status(500).send(err); });
};
