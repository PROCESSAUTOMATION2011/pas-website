const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const UserModel = require('./User');
const TaskModel = require('./Task');
const FileUploadModel = require('./FileUpload');
const OTPModel = require('./OTP');
const EnquiryModel = require('./Enquiry');
const EnquiryOTPModel = require('./EnquiryOTP');
const EnquiryCounterModel = require('./EnquiryCounter');

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