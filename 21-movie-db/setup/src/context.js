import React, { useState, useContext, useEffect } from 'react'
import { useFetch } from './useFetch';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [error, setError] = useState({ show: false, msg: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('batman');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError({ show: false, msg: '' });
      }
      else {
        setError({ show: true, msg: data.Error })
      }
      setIsLoading(false);
      console.log('data :>> ', data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }


  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`)
  }, [query])


  return (
    <AppContext.Provider value={{
      isLoading,
      error,
      movies,
      query,
      setQuery
    }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
