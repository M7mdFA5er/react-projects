
import React, { useState, useEffect } from 'react'

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

function useFetch(urlParams) {

  const [error, setError] = useState({ show: false, msg: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setData(data.Search || data);
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
    fetchData(`${API_ENDPOINT}&s=${urlParams}`)
  }, [urlParams])

  return { isLoading, error, data }
}

export default useFetch

