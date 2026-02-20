const { Notification, User } = require('../models');

// GET /api/notifications - Fetch notifications for logged-in user (or all if admin)
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'Admin';
    const where = isAdmin ? {} : { user_id: [userId, null] };
    const notifications = await Notification.findAll({
      where,
      order: [['created_at', 'DESC']],
      include: [{ model: User, attributes: ['name', 'role'] }]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.toString() });
  }
};

// POST /api/notifications - Create notification (admin only)
exports.createNotification = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });
    const notif = await Notification.create({ user_id: user_id || null, message });
    res.status(201).json({ message: 'Notification sent', notification: notif });
  } catch (err) {
    res.status(500).json({ message: 'Error creating notification', error: err.toString() });
  }
};

// PATCH /api/notifications/:id/read - Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findByPk(id);
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    notif.read = true;
    await notif.save();
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err.toString() });
  }
}; 