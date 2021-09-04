import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' })
    }, 3000);
    return () => {
      clearTimeout(timeout);
    }
  }, [alert.show])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('From Submited :>> ');
    //Validate Form Input is not Empty
    if (!input) {
      //display Alert  
      setAlert({ show: true, msg: 'Please Enter A Value!', type: 'danger' });
    }
    else if (input && isEdit) {
      //Edit Item
      setList(list.map((item) => {
        if (item.id === editID)
          return { ...item, title: input };
        return item;
      }));
      setEditID(null);
      setIsEdit(false);
      setInput('');
      setAlert({ show: true, msg: 'Value Changed!', type: 'success' });
    }
    else {
      //Add Item
      setAlert({ show: true, msg: 'Item Added', type: 'success' });
      const newItem = {
        id: new Date().getTime().toString(),
        title: input
      };
      setList([...list, newItem]);
      setInput('');
    }
  }

  const handleDeleteItems = () => {
    //Delete Items
    setList([]);
    //Show Alert
    setAlert({ show: true, msg: 'All Items cleared!', type: 'danger' });
  }

  const handleRemoveItem = (id) => {
    setAlert({ show: true, msg: 'Item Deleted', type: 'danger' });
    setList(list.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditID(id);
    setInput(editItem.title);
  }


  return (
    <section className="section-center">
      {/* Alert */}
      {alert.show && <Alert {...alert} />}
      {/* Form */}
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* title */}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. Bread"
            className="grocery"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">{isEdit ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {/* List */}
      {list.length > 0 &&
        <div className="grocery-container">
          <List items={list} removeItem={handleRemoveItem} editItem={handleEditItem} />
          <button className="clear-btn" onClick={handleDeleteItems}>Clear Items</button>
        </div>
      }
    </section>
  );
}

export default App
