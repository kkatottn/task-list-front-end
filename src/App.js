import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

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

  const fetchTasks = () => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTasks(
          response.data.map((task) => {
            return { ...task, isComplete: task.is_complete };
          })
        );
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onFormSubmit = (requestBody) => {
    axios
      .post('https://task-list-api-c17.herokuapp.com/tasks', requestBody)
      .then(() => {
        const nextId = Math.max(...tasks.map((task) => task.id)) + 1;
        const newTasks = {
          id: nextId,
          title: requestBody.title,
          description: requestBody.description,
          isComplete: false,
        };

        setTasks({ ...tasks, newTasks });
        fetchTasks();
      });
  };

  const changeComplete = (id) => {
    const tasksCopy = [...tasks];
    const obj = tasksCopy.find((task) => task.id === id);
    let apiPromise;

    if (obj.isComplete) {
      apiPromise = axios.patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_incomplete`
      );
    } else {
      apiPromise = axios.patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_complete`
      );
    }

    apiPromise.then(() => {
      obj.isComplete = !obj.isComplete;
      setTasks(tasksCopy);
      fetchTasks();
    });
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
          <NewTaskForm onFormSubmit={onFormSubmit} />
        </div>
      </main>
    </div>
  );
};

export default App;
