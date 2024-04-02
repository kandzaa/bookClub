import React from 'react';
import {useState, useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function Admin() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const history = useHistory();
  const inputRef = useRef();

  const fetchData = () => {
    fetch("http://localhost/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title, author, year }),
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
})
.then(data => {
  setData(data);
})
.catch(error => {
  console.error('Error:', error);
});
  };

  useEffect(fetchData, [title, author, year]);

  const myBooks = data.map((book, index) => (
    <div key={index}>
      <h2>{book.Nosaukums}</h2>
      <p>{book.Autors}</p>
      <p>{book.Gads}</p>
      <p>{book.Pieejamība}</p>
      <p>{book.Apraksts}</p>
      <br/><br/>
    </div>
  ));

  function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      history.push('/addbook');
    }

  return (
    <>
      <input placeholder='Nosaukums' value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder='Autors' value={author} onChange={e => setAuthor(e.target.value)} />
      <input type='number' placeholder='Gads' value={year} onChange={e => setYear(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)} />
      <button onClick={fetchData}>Search</button>
      <button className='addBook'onClick={handleSubmit}>Add a book</button>
      <div>{myBooks}</div>
    </>
  )
}

export default Admin;