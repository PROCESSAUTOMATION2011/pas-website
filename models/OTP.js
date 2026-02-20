const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OTP = sequelize.define('OTP', {
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('email', 'sms'),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  return OTP;
}; 