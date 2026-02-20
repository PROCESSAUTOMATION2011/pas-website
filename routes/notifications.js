const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, markAsRead } = require('../controllers/notificationController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// GET /api/notifications - fetch for logged-in user
router.get('/', verifyToken, getNotifications);

// POST /api/notifications - admin only
router.post('/', verifyToken, requireRole('Admin'), createNotification);

// PATCH /api/notifications/:id/read - mark as read
router.patch('/:id/read', verifyToken, markAsRead);

module.exports = router; 