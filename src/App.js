import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  useEffect(() => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTasks(
          response.data.map((task) => {
            return { ...task, isComplete: task.is_complete };
          })
        );
      });
  }, []);

  const changeComplete = (id) => {
    const tasksCopy = [...tasks];
    const obj = tasksCopy.find((task) => task.id === id);

    if (obj.isComplete) {
      axios.patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_incomplete`
      );
    } else {
      axios.patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_complete`
      );
    }

    obj.isComplete = !obj.isComplete;
    setTasks(tasksCopy);
  };

  const deleteTask = (id) => {
    axios.delete(`https://task-list-api-c17.herokuapp.com/tasks/${id}`);

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              changeComplete={changeComplete}
              deleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
