const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/message.controller');

router.post('/', message_controller.create);

router.get('/', message_controller.findAll);

router.get('/:messageId', message_controller.findById);

router.put('/:messageId', message_controller.update);

router.delete('/:messageId', message_controller.delete);

module.exports = router;
