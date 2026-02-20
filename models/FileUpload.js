const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FileUpload = sequelize.define('FileUpload', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    task_id: { type: DataTypes.INTEGER, allowNull: false },
    file_name: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING, allowNull: false },
    file_size: { type: DataTypes.INTEGER, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
    flagged: { type: DataTypes.BOOLEAN, defaultValue: false },
    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'file_uploads',
    timestamps: false
  });

  FileUpload.associate = (models) => {
    FileUpload.belongsTo(models.Task, { foreignKey: 'task_id' });
  };

  return FileUpload;
}; 