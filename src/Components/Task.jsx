import React, { useState } from 'react'
import EmailNotification from './EmailNotification'

const Task = ({ title, id, date, handledelete, markdone, priority, category, onShare, done }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const priorityColors = {
        high: 'bg-red-100 border-red-500',
        medium: 'bg-yellow-100 border-yellow-500',
        low: 'bg-green-100 border-green-500',
        completed: 'bg-gray-100 border-green-400 opacity-80'
    }

    const categoryIcons = {
        work: '💼',
        personal: '👤',
        shopping: '🛒',
        health: '🏥',
        other: '📌'
    }

    const getPriorityColor = () => done ? priorityColors.completed : (priorityColors[priority] || priorityColors.medium)

    return (
        <div 
            className={`relative transition-all duration-300 transform hover:scale-105 ${getPriorityColor()} border-l-4 rounded-lg shadow-md p-4 mb-4 mx-auto max-w-2xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <EmailNotification todo={{ id, title, date }} />
            
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{categoryIcons[category]}</span>
                        <h3 className={`text-lg font-semibold ${done ? 'line-through text-gray-500' : ''}`}>{title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Due: {new Date(date).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                    {!done && (
                        <>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => markdone(id)}
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Complete
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => handledelete(id)}
                        className={`px-3 py-1 rounded-md transition-colors ${done ? 'bg-gray-400 text-white hover:bg-gray-500' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {!done && showDetails && (
                <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Priority:</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                priority === 'high' ? 'bg-red-200 text-red-800' :
                                priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-green-200 text-green-800'
                            }`}>
                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </span>
                        </div>
                        <button
                            onClick={() => onShare()}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                            Share Task
                        </button>
                    </div>
                </div>
            )}

            {isHovered && (
                <div className="absolute -top-2 -right-2 bg-white rounded-full shadow-lg p-2">
                    <span className="text-xs text-gray-500">
                        {new Date(date).toLocaleTimeString()}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Task
