import './App.css';

import { useState } from "react";

function AddRequest() {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [number, setNumber] = useState("");
  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
      setMessage("Please select priority");
      return;
    }

   setMessage("New request added successfully");


    setTimeout(() => {
      setMessage("");
    }, 3000); 
      setValue(""); 
      setNumber("");
      setSelected("");
    };


  return (
    <div className="add-request-container">
      
      <form className="add-request-form" onSubmit={handleSubmit}>
        <h2>Add New Request</h2>

        <label htmlFor="item">Item Name:</label>
          <input
          type="text"
          id="item"
          name="item"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <label htmlFor="number">Item Number:</label>
        <input 
        type="number"
         id="number"
        name="number" 
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required />

        <label htmlFor="priority">Select Priority:</label>
      <div className="dropdown" id ="priority">
        <button type="button" onClick={() => setOpen(!open)} className="drop-btn">
          {selected || "Please select priority level "}
        </button>

        {open && (
          <div className="dropdown-menu">
            <div onClick={() => handleSelect("High")}>High</div>
            <div onClick={() => handleSelect("Medium")}>Medium</div>
            <div onClick={() => handleSelect("Low")}>Low</div>
          </div>
        )}
      </div>
        <button type="submit" className="submit-btn">Submit</button>
        {message && <div className="alert-box">{message}</div>}
   </form>
       </div>
  );
}

export default AddRequest;




