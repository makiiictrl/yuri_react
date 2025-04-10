// UseCurrentAgent.js
import { useEffect, useState } from 'react';
import axiosInstance from './ApiLogin';

// Helper: Transform agent properties into a roles array based on boolean flags.
const transformAgentRoles = (agent) => {
  const roles = [];
  if (agent.admin === true) roles.push('admin');
  if (agent.super_admin === true) roles.push('super_admin');
  if (agent.yss === true) roles.push('yss');
  if (agent.credit === true) roles.push('credit');
  return { ...agent, roles };
};

export default function UseCurrentAgent() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const api = axiosInstance();
        const response = await api.get('/current_agent');
        console.log("Current agent response:", response.data);

        // Try to extract agent data from either response.data.data or response.data itself.
        const fetchedAgent = response.data.data || response.data;
        if (fetchedAgent) {
          // If a roles array already exists, use it; otherwise, transform based on booleans.
          const transformedAgent = fetchedAgent.roles
            ? fetchedAgent
            : transformAgentRoles(fetchedAgent);
          console.log("Transformed agent data:", transformedAgent);
          setAgent(transformedAgent);
        } else {
          console.error("No agent data found in the response.");
          setAgent(null);
        }
      } catch (error) {
        console.error("Error fetching agent:", error);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, []);

  return { agent, loading };
}
