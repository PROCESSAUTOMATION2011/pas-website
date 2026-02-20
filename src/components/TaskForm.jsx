import React, { useState } from 'react';
import { apiRequest } from '../utils/api';

const TaskForm = ({ onSuccess }) => {
  const [company, setCompany] = useState('');
  const [visitAim, setVisitAim] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [locationName, setLocationName] = useState('');
  const [geoPhoto, setGeoPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('company_name', company);
      formData.append('visit_aim', visitAim);
      formData.append('task_type', taskType);
      formData.append('task_status', taskStatus);
      formData.append('lead_status', leadStatus);
      formData.append('visit_date', visitDate);
      formData.append('location_name', locationName);
      if (geoPhoto) formData.append('geo_photo', geoPhoto);
      if (document) formData.append('document', document);
      await apiRequest('/api/tasks', {
        method: 'POST',
        body: formData,
      });
      setSuccess(true);
      setCompany(''); setVisitAim(''); setTaskType(''); setTaskStatus(''); setLeadStatus(''); setVisitDate(''); setLocationName(''); setGeoPhoto(null); setDocument(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to submit task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow max-w-lg mx-auto mb-8" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-xl font-bold mb-4">Submit Task Report</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Task submitted successfully!</div>}
      <input className="w-full mb-3 p-2 border rounded" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} required />
      <input className="w-full mb-3 p-2 border rounded" placeholder="Visit Aim (Subject)" value={visitAim} onChange={e => setVisitAim(e.target.value)} required />
      <select className="w-full mb-3 p-2 border rounded" value={taskType} onChange={e => setTaskType(e.target.value)} required>
        <option value="">Task Type</option>
        <option>Sales</option>
        <option>Service</option>
        <option>Project</option>
      </select>
      <select className="w-full mb-3 p-2 border rounded" value={taskStatus} onChange={e => setTaskStatus(e.target.value)} required>
        <option value="">Task Status</option>
        <option>Finished</option>
        <option>Not Finished</option>
      </select>
      <select className="w-full mb-3 p-2 border rounded" value={leadStatus} onChange={e => setLeadStatus(e.target.value)} required>
        <option value="">Lead Status</option>
        <option>Cold Call</option>
        <option>Suspect</option>
        <option>Prospect</option>
        <option>Sure Shot</option>
      </select>
      <input className="w-full mb-3 p-2 border rounded" type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} required />
      <input className="w-full mb-3 p-2 border rounded" placeholder="Location Name" value={locationName} onChange={e => setLocationName(e.target.value)} required />
      <input className="w-full mb-3 p-2 border rounded" type="file" accept="image/*" onChange={e => setGeoPhoto(e.target.files[0])} />
      <input className="w-full mb-3 p-2 border rounded" type="file" accept=".pdf,.docx,.xlsx" onChange={e => setDocument(e.target.files[0])} />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default TaskForm; 