import React, { useState, useEffect } from 'react';
import './App.css';

const LocalTasker = () => {
  const [state, setState] = useState([]);
  const [myTasks, setMyTask] = useState('');
  const [select, setSelect] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setState(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state));
  }, [state]);

  const addTask = () => {
    if (myTasks.trim() !== '') {
      setState([...state, { id: Date.now(), description: myTasks, completed: false }]);
      setMyTask('');
      setConfirmMessage('Item added successfully!');
      setTimeout(() => setConfirmMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setConfirmMessage('Please enter a task description.');
      setTimeout(() => setConfirmMessage(''), 3000);
    }
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = state.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setState(updatedTasks);
  };

  const deleteSelectedTasks = () => {
    if (select.length > 0) {
      const updatedTasks = state.filter((task) => !select.includes(task.id));
      setState(updatedTasks);
      setSelect([]);
      setConfirmMessage('Selected items deleted successfully!');
      setTimeout(() => setConfirmMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setConfirmMessage('Please select tasks to delete.');
      setTimeout(() => setConfirmMessage(''), 3000);
    }
  };

  const handleCheckboxChange = (taskId) => {
    if (select.includes(taskId)) {
      setSelect(select.filter((id) => id !== taskId));
    } else {
      setSelect([...select, taskId]);
    }
    toggleCompletion(taskId);
  };

  return (
    <div className='main-container'>
      <h1>Grocery Bud</h1>
      <div className="con-message">{confirmMessage}</div>
      <div>
        <input
          type="text"
          value={myTasks}
          onChange={(e) => setMyTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Item</button>
      </div>
      <ul>
        {state.map((task) => (
          <li key={task.id} style={{display : "flex", flexDirection : "row", justifyContent : 'space-between' , width : "200px"}}>
            <input
              type="checkbox"
              checked={select.includes(task.id)}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <span
              className={task.completed ? 'completed-task' : ''}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.description}
            </span>
            <button onClick={() => deleteSelectedTasks()}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalTasker;