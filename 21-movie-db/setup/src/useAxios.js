import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT, useGlobalContext } from './context'

axios.defaults.baseURL = API_ENDPOINT;

export const useAxios3 = (params = {}, depndances = [], processData = null) => {




}




export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const { setIsLoading, setError } = useGlobalContext();


  const fetchData = async (params) => {
    setIsLoading(true);
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []); // execute once only

  return { response };
};