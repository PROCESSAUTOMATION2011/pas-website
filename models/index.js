const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const TaskModel = require('./Task');
const FileUploadModel = require('./FileUpload');
const OTPModel = require('./OTP');
const EnquiryModel = require('./Enquiry');
const EnquiryOTPModel = require('./EnquiryOTP');
const EnquiryCounterModel = require('./EnquiryCounter');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const models = {};
models.User = UserModel(sequelize);
models.Task = TaskModel(sequelize);
models.FileUpload = FileUploadModel(sequelize);
models.OTP = OTPModel(sequelize);
models.Enquiry = EnquiryModel(sequelize);
models.EnquiryOTP = EnquiryOTPModel(sequelize);
models.EnquiryCounter = EnquiryCounterModel(sequelize);

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models; 