// routes/api/reminders.js
const express = require('express');
const router = express.Router();
const Reminder = require('../../models/Reminder');

// POST /api/reminders
router.post('/', async (req, res) => {
  const { date, time, reminder } = req.body;

  try {
    const newReminder = new Reminder({ date, time, reminder });
    await newReminder.save();
    res.status(201).json({ success: true, data: newReminder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
