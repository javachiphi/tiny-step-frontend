import React, { useState, useEffect, useMemo } from 'react';
import { fetchData } from './apiService';
import { useAuthToken } from "../components/useAuthToken";


export default function useGroupTags() {
  const [groupTags, setGroupTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jwtToken = useAuthToken();

  useEffect(() => {
    if(jwtToken){
    fetchData('entries/groupedEntriesByTag', jwtToken)
      .then((data) => {
        setGroupTags(data);
        console.log('grouping tag', data)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }
  }, [jwtToken]);

  return useMemo(() => ({ groupTags, loading, error }), [groupTags, loading, error]);
  
};

