const express = require('express');
const { getStore } = require('../config/db');

const router = express.Router();
const store = getStore();

// GET /api/mentors - list mentors
router.get('/', (req, res) => {
  res.json({ success: true, data: store.mentors });
});

// GET /api/mentors/:id - get mentor by id
router.get('/:id', (req, res) => {
  const m = store.mentors.find(x => x.id === req.params.id || x.name.toLowerCase().includes(req.params.id.toLowerCase()));
  if (!m) return res.status(404).json({ success: false, message: 'Mentor not found' });
  res.json({ success: true, data: m });
});

module.exports = router;
