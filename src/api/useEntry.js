import React, { useState, useEffect, useMemo } from 'react';
import { fetchData } from './apiService';
import { useAuthToken } from "../components/useAuthToken";


export default function useEntry(entryId) {
  const [entry, setEntry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jwtToken = useAuthToken();

  useEffect(() => {
    if(jwtToken && entryId){
        console.log('now fetching entry')
    fetchData(`entries/${entryId}`, jwtToken)
      .then((data) => {
        setEntry(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }
  }, [jwtToken, entryId]);

  return { entry, loading, error};

};

