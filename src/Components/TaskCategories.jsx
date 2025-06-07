import React from 'react';

const TaskCategories = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    { id: 'work', name: 'Work', icon: '💼' },
    { id: 'personal', name: 'Personal', icon: '👤' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'other', name: 'Other', icon: '📌' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskCategories; 