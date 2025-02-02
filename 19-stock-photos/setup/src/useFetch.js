import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url, query, page) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        const newData = await response.json();
        console.log('url :>> ', url);
        setData((oldData) => {
          if (query && page === 1) return newData.results;
          else if (query) return [...oldData, ...newData.results]
          else return [...oldData, ...newData]
        })
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getData();
  }, [url]);


  return { loading, data, error };
}