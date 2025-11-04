const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getStore } = require('../config/db');

const router = express.Router();
const store = getStore();

/**
 * POST /api/chat/send
 * body: { userId, message }
 * returns a canned "mentor" reply (demo)
 */
router.post('/send', (req, res) => {
  const { userId, message } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'message required' });

  const chatItem = {
    id: uuidv4(),
    userId: userId || 'anonymous',
    message,
    response: `Demo reply to "${message}" — (this is a canned response for demo purposes).`,
    createdAt: new Date().toISOString()
  };

  store.chats.push(chatItem);

  // Example of structured "graphical" response payload (matches earlier schema idea)
  const structured = {
    responseType: 'text',
    data: {
      text: chatItem.response
    }
  };

  res.json({ success: true, data: structured });
});

module.exports = router;
