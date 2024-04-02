import React, { useState, useRef } from 'react';
import axios from 'axios';

function AddBook() {
    const [Nosaukums, setNosaukums] = useState('');
    const [Autors, setAutors] = useState('');
    const [Gads, setGads] = useState(0);
    const [Apraksts, setApraksts] = useState('');
    const inputRef = useRef();

    const addBook = () => {
        console.log(Autors);
        axios.post('http://localhost/', {
            title: Nosaukums,
            author: Autors,
            year: Gads,
            description: Apraksts
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
            <input placeholder="Nosaukums" onChange={e => setNosaukums(e.target.value)} /><br/>
            <input placeholder="Autors" onChange={e => setAutors(e.target.value)} /><br/>
            <input placeholder="Gads" onChange={e => setGads(e.target.value)} ref={inputRef} onInput={() => limitInputLength(inputRef.current, 4)}/><br/>
            <textarea placeholder="Apraksts" onChange={e => setApraksts(e.target.value)} /><br/>
            <button onClick={addBook}>Add a book</button>
        </>
    )
}

export default AddBook;
