import { useEffect, useState } from 'react';
import axiosInstance from './ApiLogin';

export default UseCurrentAgent = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const api = axiosInstance();
        const response = await api.get('/current_agent');
        setAgent(response.data);
      } catch (error) {
        console.error('Error fetching agent:', error);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, []);

  return { agent, loading };
};

