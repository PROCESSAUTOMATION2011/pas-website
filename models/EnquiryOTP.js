const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EnquiryOTP = sequelize.define('EnquiryOTP', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Email or phone number'
    },
    otpHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'otp_hash'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at'
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        max: 3
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    tableName: 'enquiry_otp_verifications',
    timestamps: false,
    indexes: [
      {
        fields: ['identifier']
      },
      {
        fields: ['identifier', 'verified']
      },
      {
        fields: ['expires_at']
      }
    ]
  });

  return EnquiryOTP;
};









