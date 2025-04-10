// LoginForm.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './ApiLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the route the user attempted to access (if any)
  const requestedRoute = location.state?.from?.pathname;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const api = axiosInstance();
      const response = await api.post('/agents/sign_in', {
        agent: { email, password },
      });

      // Log the full response for debugging
      console.log("Login response data:", response.data);

      const token = response.data.token;

      if (token) {
        // Ensure token is prefixed with "Bearer "
        const cleanToken =
          token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        localStorage.setItem('token', cleanToken);

        // Extract agent from the response:
        // Since your agent data is inside `data` property, use that.
        let agent =
          response.data.data ||
          response.data.agent ||
          response.data.user;
          
        // If agent data is still missing, throw an error.
        if (!agent) {
          throw new Error('Agent data not found in response. Check the API response structure.');
        }

        // Transform the agent properties into a roles array.
        const roles = [];
        if (agent.admin === 1) roles.push('admin');
        if (agent.super_admin === 1) roles.push('super_admin');
        if (agent.yss === 1) roles.push('yss');
        if (agent.credit === 1) roles.push('credit');

        const transformedAgent = { ...agent, roles };

        // Save the transformed agent into local storage.
        localStorage.setItem('agent', JSON.stringify(transformedAgent));

        // Determine default redirect based on roles.
        const isAdmin = roles.includes('admin') || roles.includes('super_admin');
        const defaultRedirect = isAdmin ? '/admin_dashboard' : '/dashboard';

        // Use the requested route if available, otherwise fallback to defaultRedirect.
        const redirectRoute = requestedRoute || defaultRedirect;

        // For hash-based routing, update the hash and reload.
        window.location.hash = redirectRoute;
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setFlashMessage('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFlashMessage('Login failed: ' + error.message);
    }
  };

  return (
    <main className="container mt-5">
      <h2 className="text-center text-primary">Log in</h2>
      {flashMessage && (
        <div className="alert alert-warning text-center">{flashMessage}</div>
      )}
      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
