import axios from 'axios';
import {useEffect, useState} from 'react';

export const useHomebankApi = <S>(initialState: S): {
  apiResult: S;
  isLoading: boolean;
  error: string;
  doFetch: (routeSegment: string) => void;
} => {
  const [apiResult, setApiResult] = useState(initialState);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setIsLoading(true);

      try {
        const result = await axios.request<S>({url});

        setApiResult(result.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = (routeSegment: string) => {
    setUrl(`${process.env.REACT_APP_API_URL}/${routeSegment}`);
  };

  return {apiResult, isLoading, error, doFetch};
};
