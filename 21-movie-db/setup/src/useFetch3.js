import React, { useState, useEffect, useCallback } from 'react'
import { useGlobalContext } from './context'

const useFetch = ({ url, params }) => {

  const [data, setData] = useState({});
  const { setLoading, setError } = useGlobalContext();
  console.log('url :>> ', url);

  const getData = useCallback(async () => {
    setLoading(true);
    setError({ show: false, msg: '' });
    try {
      const response = await fetch(url);
      const ndata = await response.json();
      setData(ndata);
      setLoading(false);
    } catch (error) {
      setError({ show: true, msg: error });
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData();
  }, [url])


  return { data }
}

export default useFetch;