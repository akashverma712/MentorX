const express = require('express');
const router = express.Router();

const users = require('./users');
const mentors = require('./mentors');
const chat = require('./chat');

router.use('/users', users);
router.use('/mentors', mentors);
router.use('/chat', chat);

module.exports = router;
