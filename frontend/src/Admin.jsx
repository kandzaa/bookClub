import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Admin() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const history = useHistory();
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

  const removeBook = (bookId) => {
    fetch(`http://localhost/books.php?id=${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to remove book');
      }
    })
    .catch(error => console.error('Error removing book:', error));
  };
  
  
  

  const myBooks = data.map((book, index) => (
    <div key={index} className='book_container'>
      <img src={book.image} className='book_image' alt={`Cover of ${book.title}`} />
      <div className='book_text'>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.release_year}</p>      
        <p>{book.availability ? "Available" : "Not Available"}</p>
        <button className='remove_button' onClick={() => removeBook(book.id)}>remove</button>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/addbook');
  };

  return (
    <>
      <div>
        <h2 className='search_title'>Search a book</h2>
        <div className='search_tab'>
          <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='book_search'/>
          <input placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} className='book_search'/>
          <input type='number' placeholder='Year' value={year} onChange={e => setYear(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)} className='book_search'/>
          <button className='addBook' onClick={handleSubmit}>Add a book</button>
        </div>
      </div>
      
      <div>{myBooks.length > 0 ? myBooks : "No books available"}</div>
    </>
  )
}

export default Admin;
