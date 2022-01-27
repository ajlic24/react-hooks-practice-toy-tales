import React, { useState } from "react";

function ToyCard({toy, onDelete, onLike}) {
  const {id, name, image, likes} = toy

  function handleClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(() => onDelete(id))
  }

  function handleLike() {
    const newObj = {...toy, likes: likes + 1 }
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(r => r.json())
      .then(data => onLike(data))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike} >Like {"<3"}</button>
      <button className="del-btn" onClick={handleClick} >Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
