import React, { useState, useEffect, useRef } from 'react';

function Guest() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const inputRef = useRef();

  const fetchData = () => {
    fetch("http://localhost/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, year }),
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
    })

  };

  useEffect(fetchData, [title, author, year]);

  const myBooks = data.map((book, index) => (
    <div key={index}>
      <h2>{book.Nosaukums}</h2>
      <p>{book.Autors}</p>
      <p>{book.Gads}</p>
      <p>{book.Pieejamība}</p>
      <p>{book.Apraksts}</p>
    </div>
  ));

  function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }

  return (
    <>
      <input placeholder='Nosaukums' value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder='Autors' value={author} onChange={e => setAuthor(e.target.value)} />
      <input type='number' placeholder='Gads' value={year} onChange={e => setYear(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)} />
      <button onClick={fetchData}>Search</button>
      <div>{myBooks}</div>
    </>
  )
}

export default Guest;
