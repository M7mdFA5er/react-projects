import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(true);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const newData = await response.json();
      setData(newData);
      setError(null);
      setLoading(false);
      setReload(false);
    } catch (error) {
      console.log('error :>> ', error);
      setError(error);
      setLoading(false);
      setReload(false);
    }
  }, [url]);


  useEffect(() => {
    if (reload) getData();
  }, [url, getData, reload]);


  return { loading, data, error, setReload };
}
