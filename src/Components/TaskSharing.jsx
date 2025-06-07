import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";

const TaskSharing = ({ task, onShare }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const { user } = useUser();

  const handleShare = (e) => {
    e.preventDefault();
    onShare({
      taskId: task.id,
      sharedWith: email,
      permission,
      sharedBy: user.primaryEmailAddress?.emailAddress
    });
    setEmail('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Share Task</h3>
      <form onSubmit={handleShare} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Share with (email)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email address"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permission Level
          </label>
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="view">View Only</option>
            <option value="edit">Can Edit</option>
            <option value="admin">Full Access</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Share Task
        </button>
      </form>

      {task.sharedWith && task.sharedWith.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Shared With</h4>
          <div className="space-y-2">
            {task.sharedWith.map((share, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{share.email}</span>
                <span className="text-xs text-gray-500">{share.permission}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSharing; 