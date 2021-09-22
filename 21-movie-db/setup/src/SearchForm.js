import React from 'react'
import { useGlobalContext } from './context'
import { useFetch } from './useFetch';


const SearchForm = () => {
  const { url, setError, error, setMovies } = useGlobalContext();

  const processData = (rawData) => {
    if (rawData.Response === 'True') {
      return rawData.Search;
    }
    else {
      setError({ show: true, msg: data.Error });
    }
  }

  const data = useFetch({ url, init: null, processData });


  if (!error.show) setMovies(data);
  console.log('data :>> ', data);

  return (<h2>search component</h2>)
}

export default SearchForm
