import React, { useState, useEffect, useRef } from 'react';

function Guest({ userId }) {
  const [data, setData] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost/books.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, year })
    })
    .then(response => response.json())
    .then(data => {
      setData(data); 
    })
    .catch(error => console.error('Error fetching books:', error)); 
  };

  useEffect(fetchData, [title, author, year]);

  // const reserveBook = (id, userId) => {
  //   fetch(`http://localhost/reserve.php?id=${id}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.success) {
  //       setReservedBooks([...reservedBooks, id]);
  //     } else {
  //       alert('Book is already reserved.');
  //     }
  //   })
  //   .catch(error => console.error('Error reserving book:', error)); 
  // };

  const myBooks = data.map((book, index) => (
    <div key={index} className='book_container'>
      <img src={book.image} className='book_image' alt={book.title}></img>
      <div className='book_text'>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.release_year}</p>      
        <p>{reservedBooks.includes(book.id) ? "Not Available" : "Available"}</p>
        {/* <button onClick={() => reserveBook(book.id, userId)} disabled={reservedBooks.includes(book.id)}>Reserve</button> */}
      </div>
      <div className='book_text'>
        <h3>Description:</h3>
        <p className='description'>{book.DESCRIPTION}</p>
      </div>
    </div>
  ));

  function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }

  return (
    <>
      <div>
        <h2 className='search_title'>Search a book</h2>
        <div className='search_tab'>
          <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='book_search'/>
          <input placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} className='book_search'/>
          <input type='number' placeholder='Year' value={year} onChange={e => setYear(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)} className='book_search'/>
        </div>
      </div>
      <div>{myBooks.length > 0 ? myBooks : "No books available"}</div>
    </>
  );
}

export default Guest;
