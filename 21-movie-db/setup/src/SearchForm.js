import React from 'react'
import { useGlobalContext } from './context'
import useFetch from './useFetch';


const SearchForm = () => {
  const { url } = useGlobalContext();
  const { data } = useFetch({ url });

  return (<h2>search component</h2>)
}

export default SearchForm
