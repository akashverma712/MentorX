const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getStore } = require('../config/db');

const router = express.Router();
const store = getStore();

// GET /api/users - list users
router.get('/', (req, res) => {
  res.json({ success: true, data: store.users });
});

// POST /api/users/register - register user (simple)
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) return res.status(400).json({ success: false, message: 'name and email required' });

  const exists = store.users.find(u => u.email === email);
  if (exists) return res.status(409).json({ success: false, message: 'User already exists' });

  const newUser = { id: uuidv4(), name, email, createdAt: new Date().toISOString() };
  store.users.push(newUser);
  res.json({ success: true, data: newUser });
});

module.exports = router;
