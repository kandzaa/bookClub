import React, { useState, useRef } from 'react';
import axios from 'axios';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [DESCRIPTION, setDESCRIPTION] = useState('');
    const [image, setImage] = useState('');
    const inputRef = useRef();

    const addBook = () => {
        axios.post('http://localhost/addBook.php', {
            title: title,
            author: author,
            year: year,
            DESCRIPTION: DESCRIPTION,
            image: image
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    };

    function limitInputLength(element, maxLength) {
        if (element.value.length > maxLength) {
            element.value = element.value.slice(0, maxLength);
        }
    }

    return (
        <>
            <input placeholder="Nosaukums" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <input placeholder="Autors" value={author} onChange={e => setAuthor(e.target.value)} /><br/>
            <input type="number" placeholder="Gads" value={year} onChange={e => setYear(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)} /><br/>
            <input placeholder='Apraksts' value={DESCRIPTION} onChange={e => setDESCRIPTION(e.target.value)}/><br/>
            <input placeholder='image-link' value={image} onChange={e => setImage(e.target.value)}/><br/>
            <button onClick={addBook}>Add a book</button>
        </>
    )
}

export default AddBook;
