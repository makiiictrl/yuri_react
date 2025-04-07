import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './ApiLogin';

export default LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || "/agent_user_menus";

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
        
        // Update the hash route (e.g., "#/dashboard" or "#/agent_user_menus")
        window.location.hash = from;
        
        // Force a full reload after a short delay
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
