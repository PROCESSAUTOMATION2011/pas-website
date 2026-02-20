const express = require('express');
const router = express.Router();
const { submitTask, searchMyTasks, upload } = require('../controllers/taskController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// POST /api/tasks - Submit task (with file upload)
router.post(
  '/',
  verifyToken,
  requireRole('Employee'),
  upload.fields([
    { name: 'geo_photo', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  submitTask
);

// GET /api/tasks/search - Employee smart search
router.get(
  '/search',
  verifyToken,
  requireRole('Employee'),
  searchMyTasks
);

module.exports = router; 