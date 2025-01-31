import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
   const [items, setItems] = useState([]);
   const [newItem, setNewItem] = useState('');

   useEffect(() => {
      axios.get('http://localhost:5000/api/items')
         .then(res => setItems(res.data))
         .catch(err => console.error(err));
   }, []);

   const addItem = () => {
      axios.post('http://localhost:5000/api/items', { name: newItem })
         .then(res => setItems([...items, res.data]))
         .catch(err => console.error(err));
      setNewItem('');
   };

   return (
      <div>
         <h1>Items List</h1>
         <ul>
            {items.map(item => (
               <li key={item._id}>{item.name}</li>
            ))}
         </ul>
         <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
         />
         <button onClick={addItem}>Add Item</button>
      </div>
   );
};

export default App;
