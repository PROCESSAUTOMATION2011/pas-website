const { Task, User } = require('../models');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads (local, S3-ready)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, ''));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.xlsx', '.jpg', '.jpeg', '.png'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Invalid file type'));
  },
});
exports.upload = upload;

// POST /api/tasks - Submit new task
exports.submitTask = async (req, res) => {
  try {
    const { company_name, visit_aim, task_type, lead_status, task_status, visit_date, location_name, location_lat, location_lng } = req.body;
    const employee_id = req.user.id;
    let geo_photo_url = null, document_url = null;
    if (req.files) {
      if (req.files.geo_photo) geo_photo_url = req.files.geo_photo[0].path;
      if (req.files.document) document_url = req.files.document[0].path;
    }
    const task = await Task.create({
      employee_id,
      company_name,
      visit_aim,
      task_type,
      lead_status,
      task_status,
      visit_date,
      location_name,
      location_lat,
      location_lng,
      geo_photo_url,
      document_url,
    });
    res.status(201).json({ message: 'Task submitted', task });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting task', error: err.toString() });
  }
};

// GET /api/tasks/search - Employee smart search
exports.searchMyTasks = async (req, res) => {
  try {
    const employee_id = req.user.id;
    const { q, company, type, date } = req.query;
    const where = { employee_id };
    if (company) where.company_name = { [Op.iLike]: `%${company}%` };
    if (type) where.task_type = type;
    if (date) where.visit_date = date;
    if (q) where[Op.or] = [
      { company_name: { [Op.iLike]: `%${q}%` } },
      { visit_aim: { [Op.iLike]: `%${q}%` } },
    ];
    const tasks = await Task.findAll({ where, order: [['visit_date', 'DESC']] });
    // Only show reminder info, no sensitive fields
    const reminders = tasks.map(t => ({
      id: t.id,
      company_name: t.company_name,
      visit_aim: t.visit_aim,
      task_type: t.task_type,
      task_status: t.task_status,
      lead_status: t.lead_status,
      visit_date: t.visit_date,
    }));
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Error searching tasks', error: err.toString() });
  }
}; 