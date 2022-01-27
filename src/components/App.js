import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyData, setToyData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/toys`)
      .then(r => r.json())
      .then(toys => setToyData(toys))
  }, [])

  function onDelete(id) {
    setToyData(toyData.filter(toy => toy.id !== id))
    
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function onSubmit(newToy) {
    setToyData([...toyData, newToy])
  }

  function onLike(newObj) {
    const updated = [...toyData].map(toy => {
      if (toy.id === newObj.id) {
        return newObj
      } else {
        return toy
      }
    })
    setToyData(updated)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onSubmit={onSubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyData={toyData} onDelete={onDelete} onLike={onLike} />
    </>
  );
}

export default App;
