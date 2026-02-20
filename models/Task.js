const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    company_name: { type: DataTypes.STRING, allowNull: false },
    visit_aim: { type: DataTypes.TEXT, allowNull: false },
    task_type: { type: DataTypes.ENUM('Sales', 'Service', 'Project'), allowNull: false },
    lead_status: { type: DataTypes.ENUM('Cold Call', 'Suspect', 'Prospect', 'Sure Shot'), allowNull: false },
    task_status: { type: DataTypes.ENUM('Finished', 'Not Finished'), allowNull: false },
    visit_date: { type: DataTypes.DATEONLY, allowNull: false },
    location_name: { type: DataTypes.TEXT, allowNull: false },
    geo_photo_url: { type: DataTypes.STRING },
    document_url: { type: DataTypes.STRING },
    location_lat: { type: DataTypes.DOUBLE },
    location_lng: { type: DataTypes.DOUBLE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'tasks',
    timestamps: false
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'employee_id' });
    Task.hasMany(models.FileUpload, { foreignKey: 'task_id' });
  };

  return Task;
}; 