import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('From Submited :>> ');
    
  }



  return (
    <section className="section-center">
      {/* Alert */}
      {alert.show && <Alert />}
      {/* Form */}
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* title */}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. Bread"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">{isEdit ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {/* List */}
      <div className="grocery-container">
        <List />
        <button className="clear-btn" onClick={null}>Clear Items</button>
      </div>
    </section>
  );
}

export default App
