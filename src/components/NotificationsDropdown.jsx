import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/notifications');
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id) => {
    await apiRequest(`/api/notifications/${id}/read`, { method: 'PATCH' });
    fetchNotifications();
  };

  return (
    <div className="relative">
      <button className="relative" onClick={() => setOpen(!open)}>
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2 font-bold border-b">Notifications</div>
          {loading && <div className="p-2">Loading...</div>}
          {!loading && notifications.length === 0 && <div className="p-2 text-gray-500">No notifications</div>}
          {!loading && notifications.map(n => (
            <div key={n.id} className={`p-2 border-b ${n.read ? 'bg-gray-100' : 'bg-yellow-50'}`}>
              <div>{n.message}</div>
              <div className="text-xs text-gray-500">{new Date(n.created_at).toLocaleString()}</div>
              {!n.read && <button className="text-blue-600 text-xs mt-1" onClick={() => handleMarkAsRead(n.id)}>Mark as read</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown; 