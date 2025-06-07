import logo2 from './Images/3rd.png'
import logo3 from './Images/4th.png'
import Task from './Components/Task'
import TaskStats from './Components/TaskStats'
import TaskAnalytics from './Components/TaskAnalytics'
import TaskCategories from './Components/TaskCategories'
import TaskSharing from './Components/TaskSharing'
import Navbar from './Components/Navbar'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Done from './Components/Done'
import Newnav from './Components/Newnav'
import Outro from './Components/Outro'

const apiurl = 'https://my-todo-af742-default-rtdb.asia-southeast1.firebasedatabase.app/';

function App() {
  let Input = useRef(null);
  let Duedate = useRef(null);
  let { user } = useUser()
  let [status, setstatus] = useState(false);
  let [todos, settodos] = useState([]);
  let [isopen, setopen] = useState(false);
  let [priority, setPriority] = useState("medium");
  let [category, setCategory] = useState("all");
  let [selectedTask, setSelectedTask] = useState(null);
  let [showSharing, setShowSharing] = useState(false);
  let [currentTab, setCurrentTab] = useState('all');

  function handlesubmit() {
    setstatus(true);
    let task = Input.current.value;
    let date = Duedate.current.value;
    axios.post(`${apiurl}todos.json`, {
      title: task,
      date: date,
      done: false,
      createdby: user.username,
      priority: priority,
      category: category,
      userEmail: user.primaryEmailAddress?.emailAddress,
      sharedWith: [],
      createdAt: new Date().toISOString()
    }).then(() => {
      Input.current.value = '';
      Duedate.current.value = '';
      setstatus(false);
      fetchdata();
    })
  }

  function handletoggle() {
    setopen((prev) => !prev)
  }

  function fetchdata() {
    axios.get(`${apiurl}todos.json`).then(todos => {
      let temptodo = [];
      for (let key in todos.data) {
        let todo = {
          id: key,
          title: todos.data[key].title,
          date: todos.data[key].date,
          done: todos.data[key].done,
          createdby: todos.data[key].createdby,
          priority: todos.data[key].priority || 'medium',
          category: todos.data[key].category || 'other',
          userEmail: todos.data[key].userEmail,
          sharedWith: todos.data[key].sharedWith || [],
          createdAt: todos.data[key].createdAt
        }
        temptodo.push(todo);
      }
      settodos(temptodo);
    })
  }

  // Filtering logic based on tab and category
  const filteredTodos = todos.filter((todo) => {
    const matchesTab =
      currentTab === 'all' ? true :
      currentTab === 'completed' ? todo.done :
      currentTab === 'remaining' ? !todo.done : true;
    const matchesCategory = category === "all" ? true : todo.category === category;
    return matchesTab && matchesCategory && todo.createdby === user?.username;
  });

  function handledelete(id) {
    axios.delete(`${apiurl}todos/${id}.json`).then(() => {
      fetchdata();
    })
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function markdone(id) {
    axios.patch(`${apiurl}todos/${id}.json`, {
      done: true,
    }).then(() => {
      fetchdata();
    })
  }

  const handleShare = async (shareData) => {
    try {
      const task = todos.find(t => t.id === shareData.taskId);
      const updatedSharedWith = [...(task.sharedWith || []), {
        email: shareData.sharedWith,
        permission: shareData.permission,
        sharedBy: shareData.sharedBy
      }];

      await axios.patch(`${apiurl}todos/${shareData.taskId}.json`, {
        sharedWith: updatedSharedWith
      });

      fetchdata();
      setShowSharing(false);
    } catch (error) {
      console.error('Error sharing task:', error);
    }
  };

  // Only show analytics on 'all' or 'dashboard' tab
  const showAnalytics = currentTab === 'all' || currentTab === 'dashboard';

  return (
    <>
      <SignedOut>
        <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      </SignedOut>

      <SignedIn>
        <Navbar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          userButton={<UserButton />}
        />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Show analytics only on dashboard */}
          {currentTab === 'dashboard' && <TaskAnalytics todos={todos.filter(todo => todo.createdby === user?.username)} />}
          <TaskCategories onCategorySelect={setCategory} selectedCategory={category} />
          {currentTab === 'dashboard' && <TaskStats todos={todos.filter(todo => todo.createdby === user?.username)} />}

          {/* Add Task Form at the top of analytics if visible */}
          {isopen && (
            <div className='card max-w-md mx-auto mb-8 relative'>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                onClick={() => setopen(false)}
                aria-label="Close Add Task"
              >
                &times;
              </button>
              <div className='text-center w-full'>
                <h1 className='mb-2 font-bold text-lg'>Welcome @{user?.username ? user.fullName : "Guest"}</h1>
                <h1 className='text-2xl font-bold mb-3 text-indigo-800'>Add a new task...</h1>
                <p className='text-gray-600'>Keep track of your tasks and stay organized by adding your to-dos below.</p>
                <div className='flex flex-col gap-2 mt-2 p-2'>
                  <input ref={Input} required type="text" className='w-full' placeholder="Enter task description" />
                  <div className="flex gap-2">
                    <input ref={Duedate} required type="date" className='w-1/2' />
                    <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-1/2"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button className='bg-indigo-500 w-full p-2 rounded-md mt-3 text-white text-lg hover:bg-indigo-600 transition-colors' onClick={() => { handlesubmit(); setopen(false); }}>
                  {!status ? 'Create task' : 'Submitting..'}
                </button>
              </div>
            </div>
          )}

          {/* Show tasks for All Tasks, Remaining, Completed, and Dashboard, with correct filtering */}
          {(currentTab === 'all' || currentTab === 'remaining' || currentTab === 'completed' || currentTab === 'dashboard') && (
            <div className='mt-4'>
              {filteredTodos.length === 0 && (
                <div className="text-center text-gray-400 text-lg py-8">No tasks found for this filter.</div>
              )}
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="relative">
                  <Task 
                    title={todo.title} 
                    id={todo.id} 
                    date={todo.date} 
                    handledelete={handledelete} 
                    markdone={markdone}
                    priority={todo.priority}
                    category={todo.category}
                    done={todo.done}
                    onShare={() => {
                      setSelectedTask(todo);
                      setShowSharing(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {showSharing && selectedTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <TaskSharing 
                  task={selectedTask} 
                  onShare={handleShare}
                />
                <button
                  onClick={() => setShowSharing(false)}
                  className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Floating Action Button - smaller, modern */}
          <button 
            onClick={handletoggle} 
            className='fab shadow-lg !w-12 !h-12 !text-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center' 
            aria-label="Show Add Task Form"
            style={{ right: '1.5rem', bottom: '1.5rem' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </SignedIn>
      <SignedOut>
        <Outro />
      </SignedOut>
    </>
  )
}

export default App;