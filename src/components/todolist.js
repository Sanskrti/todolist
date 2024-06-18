import React from "react";
import s from './todolist.css';
import react , { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';  
import AddIcon from '@material-ui/icons/Add';        
import CreateIcon from '@material-ui/icons/Create';
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditInputValue(taskToEdit.text);
    setEditingTaskId(taskId);
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === editingTaskId) {
        return { ...task, text: editInputValue };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditInputValue('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

   return (

    <div className="todo-extra-container">
    <div className="container">
   
      <h2><i>Todo List</i></h2>
      <input
        type="text"
        placeholder="Add a task..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}><AddIcon/></button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editInputValue}
                  onChange={(e) => setEditInputValue(e.target.value)}
                />
                <button onClick={handleSaveTask}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => handleEditTask(task.id)}><CreateIcon /></button>
              </>
            )}
            <button onClick={() => handleDeleteTask(task.id)}> <DeleteIcon/></button>
          </li>
          
        ))}
      </ul>
      
      
      </div>
    </div>
   
);
};

export default TodoList;