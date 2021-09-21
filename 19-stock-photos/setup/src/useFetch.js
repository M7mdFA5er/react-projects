import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const newData = await response.json();
      //setData(newData);
      setData((oldData) => {
        return [...oldData, ...newData]
      })
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);


  useEffect(() => {
    getData();
  }, []);


  return { loading, data, error };
}