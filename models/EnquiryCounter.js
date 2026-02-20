const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EnquiryCounter = sequelize.define('EnquiryCounter', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      comment: 'Format: enquiry_YYYY (e.g., enquiry_2025)'
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'enquiry_counters',
    timestamps: false
  });

  return EnquiryCounter;
};









