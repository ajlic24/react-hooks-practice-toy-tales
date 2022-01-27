import React, { useState } from "react";

function ToyForm({onSubmit}) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    likes: 0,
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3001/toys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newToy => onSubmit(newToy))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit} >
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
          value={formData.image}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
