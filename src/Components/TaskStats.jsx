import React from 'react';

const TaskStats = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.done).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getPriorityCount = (priority) => {
    return todos.filter(todo => todo.priority === priority).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Task Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700">Total Tasks</h3>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Completed</h3>
          <p className="text-3xl font-bold">{completedTasks}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
          <p className="text-3xl font-bold">{pendingTasks}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-700">Completion Rate</h3>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Priority Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-red-700 font-semibold">High Priority</p>
            <p className="text-2xl font-bold">{getPriorityCount('high')}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-yellow-700 font-semibold">Medium Priority</p>
            <p className="text-2xl font-bold">{getPriorityCount('medium')}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-green-700 font-semibold">Low Priority</p>
            <p className="text-2xl font-bold">{getPriorityCount('low')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats; 