import React from 'react';

const TaskReminderCard = ({ company, visitAim, taskType, taskStatus, leadStatus, visitDate }) => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded">
    <div className="font-bold">You visited {company} for {visitAim} on {visitDate}.</div>
    <div>Task: {taskType} | Status: {taskStatus}</div>
    <div>Lead: {leadStatus}</div>
  </div>
);

export default TaskReminderCard; 