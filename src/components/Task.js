import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, changeComplete, deleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => changeComplete(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTask(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  changeComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
