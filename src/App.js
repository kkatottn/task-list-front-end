import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

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

  const changeComplete = (id) => {
    const tasksCopy = [...tasks];
    const obj = tasksCopy.find((task) => task.id === id);
    obj.isComplete = !obj.isComplete;

    setTasks(tasksCopy);
  };

  const deleteTask = (id) => {
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
              tasks={TASKS}
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
