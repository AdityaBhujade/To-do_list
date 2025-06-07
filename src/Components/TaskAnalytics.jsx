import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const TaskAnalytics = ({ todos }) => {
  // Prepare data for completion trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const completionTrendData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Completed Tasks',
        data: last7Days.map(date => 
          todos.filter(todo => 
            todo.done && todo.date === date
          ).length
        ),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Prepare data for priority distribution
  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          todos.filter(todo => todo.priority === 'high').length,
          todos.filter(todo => todo.priority === 'medium').length,
          todos.filter(todo => todo.priority === 'low').length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
      },
    ],
  };

  // Prepare data for task completion rate
  const completionRateData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [
          todos.filter(todo => todo.done).length,
          todos.filter(todo => !todo.done).length,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
        ],
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="card p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 self-start">Completion Trend (Last 7 Days)</h3>
          <div className="w-full h-56 md:h-64">
            <Line 
              data={completionTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Daily Task Completion', font: { size: 14 } },
                },
                scales: { y: { beginAtZero: true, max: 5 } },
              }}
            />
          </div>
        </div>
        <div className="card p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 self-start">Priority Distribution</h3>
          <div className="w-full h-56 md:h-64 flex items-center justify-center">
            <Doughnut 
              data={priorityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
              }}
            />
          </div>
        </div>
        <div className="card p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 self-start">Task Completion Rate</h3>
          <div className="w-full h-56 md:h-64 flex items-center justify-center">
            <Doughnut 
              data={completionRateData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
              }}
            />
          </div>
        </div>
        <div className="card p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 self-start">Task Categories</h3>
          <div className="w-full h-56 md:h-64">
            <Bar 
              data={{
                labels: ['Work', 'Personal', 'Shopping', 'Health', 'Other'],
                datasets: [
                  {
                    label: 'Tasks by Category',
                    data: [
                      todos.filter(todo => todo.category === 'work').length,
                      todos.filter(todo => todo.category === 'personal').length,
                      todos.filter(todo => todo.category === 'shopping').length,
                      todos.filter(todo => todo.category === 'health').length,
                      todos.filter(todo => todo.category === 'other').length,
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, max: 5 } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics; 