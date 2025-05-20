import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 1000 * 60 * 5;

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const storateKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }
    return `${url}?${JSON.stringify(options.params)}`;
  }, [url, options]);

  useEffect(() => {
    const fetchedData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storateKey);

      if (cachedData && currentTime - cachedData.time < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Something went wrong. please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchedData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, options]);

  useEffect(() => {
    if (!data) return;
    setItem(storateKey, {
      time: new Date().getTime(),
      data,
    });
  }, [data, storateKey]);

  return { data, isLoading, error };
};

export default useFetch;
