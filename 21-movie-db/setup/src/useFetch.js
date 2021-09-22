import { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "./context";

export const useFetch = ({ url, init, processData }) => {
  console.log('processData :>> ', init);
  // Response state
  const [data, setData] = useState();
  // useGlobalContext Hook
  const { setLoading, setError } = useGlobalContext();

  // Turn objects into strings for useCallback & useEffect dependencies
  const [stringifiedUrl, stringifiedInit] = [JSON.stringify(url), JSON.stringify(init)];

  // If no processing function is passed just return the data
  // The callback hook ensures that the function is only created once
  // and hence the effect hook below doesn't start an infinite loop
  const processJson = useCallback(processData || ((jsonBody) => jsonBody), []);

  useEffect(() => {
    // Define asynchronous function
    const fetchApi = async () => {
      setLoading(true);
      setError({ show: false, msg: '' });
      try {
        // Fetch data from REST API
        const response = await fetch(url, init);

        if (response.status === 200) {
          // Extract json
          const rawData = await response.json();
          const processedData = processJson(rawData);
          setData(processedData);
          setLoading(false);
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
          setError({ show: true, msg: response });
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error ${error}`);
        setError({ show: true, msg: error });
        setLoading(false);
      }
    };

    // Call async function
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedUrl, stringifiedInit, processJson]);

  return data;
};