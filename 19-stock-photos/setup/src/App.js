import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
import { useFetch } from './useFetch'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
let url;


function App() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  let urlPage = `&page=${page}`;
  const urlQuery = `&query=${query}`;

  if (query) url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  else url = `${mainUrl}${clientID}${urlPage}`;

  const { loading, data: photos, error } = useFetch(url, query, page);

  //photos = (data && !loading) ? [...data] : photos;

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2)) {
        setPage((oldPage) => { return oldPage + 1 });
      }
    });
    return () => {
      window.removeEventListener('scroll', event);
    }
  }, [page]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  }

  //if (loading) return <h2 className='loading'>Loading ...</h2>;
  return (

    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type="text"
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}><FaSearch /></button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {
            photos.map((image) => {
              return <Photo key={image.id} {...image} />
            })
          }
        </div>
        {loading && <h2 className='loading'>Loading ...</h2>}
      </section>
    </main>
  )
}

export default App
