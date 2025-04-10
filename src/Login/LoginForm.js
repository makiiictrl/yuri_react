import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './ApiLogin';

export default LoginForm = () => {
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

      const token = response.data.token;

      if (token) {
        // Ensure token is prefixed with "Bearer "
        const cleanToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        localStorage.setItem('token', cleanToken);

        // Store the agent info (including the admin boolean) as JSON
        const agent = response.data.agent;
        localStorage.setItem('agent', JSON.stringify(agent));

        // Determine whether the agent is admin.
        // Assuming agent.admin is 1 for admin and 0 for non-admin.
        const isAdmin = agent && agent.admin === 1;

        // Set the default routes:
        // - Admin users: '/admin_dashboard'
        // - Non-admin users: '/dashboard'
        const defaultRedirect = isAdmin ? '/admin_dashboard' : '/dashboard';

        // If there was a requested route, use it,
        // but if it's '/admin_dashboard' and the agent is not admin, use the non-admin default.
        const redirectRoute =
          requestedRoute
            ? (requestedRoute === '/admin_dashboard' && !isAdmin ? defaultRedirect : requestedRoute)
            : defaultRedirect;

        // For hash-based routing, update the hash route then force a full reload.
        window.location.hash = redirectRoute;
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setFlashMessage('Login failed.');
      }
    } catch (error) {
      setFlashMessage('Login failed: ' + error.message);
    }
  };

  return (
    <main className="container mt-5">
      <h2 className="text-center text-primary">Log in</h2>
      {flashMessage && <div className="alert alert-warning text-center">{flashMessage}</div>}
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
              <button type="submit" className="btn btn-primary">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
