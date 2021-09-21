import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
import { useFetch } from './useFetch'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`



function App() {
  const [page, setPage] = useState(1);


  let urlPage = `&page=${page}`;
  let url = `${mainUrl}${clientID}${urlPage}`;

  const { loading, data: photos, error } = useFetch(url);

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

  }

  //if (loading) return <h2 className='loading'>Loading ...</h2>;
  return (

    <main>
      <section className='search'>
        <form className='search-form'>
          <input type="text" placeholder='search' className='form-input' />
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
