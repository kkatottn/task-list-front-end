import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [formFields, setFormFields] = useState({ title: '', description: '' });

  // const onTitleChange = (event) => {
  //   setFormFields({ ...formFields, title: event.target.value });
  // };

  // const onDescriptionChange = (event) => {
  //   setFormFields({ ...formFields, description: event.target.value });
  // };

  const handleChange = (event) => {
    const element = event.target;
    const name = element.name;
    const value = element.value;

    const newTaskData = { ...formFields };
    newTaskData[name] = value;
    setFormFields(newTaskData);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onFormSubmit(formFields);
        setFormFields({ title: '', description: '' });
      }}
    >
      <div>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          name="title"
          value={formFields.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formFields.description}
          onChange={handleChange}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

NewTaskForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
