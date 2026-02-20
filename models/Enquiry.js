const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Enquiry = sequelize.define('Enquiry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    enquiryNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'enquiry_no'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'company_name'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'contact_no'
    },
    requirementDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'requirement_details'
    },
    otpVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'otp_verified'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    tableName: 'enquiries',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['enquiry_no']
      },
      {
        fields: ['email']
      },
      {
        fields: ['created_at']
      }
    ]
  });

  return Enquiry;
};









