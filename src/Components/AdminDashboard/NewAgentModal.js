// NewAgentModal.js
import React, { useState } from 'react';
import { newAgents } from '../../Helpers/Models';
import { saveAgent } from '../../Services/DashboardServices';

const NewAgentModal = () => {
  const [formData, setFormData] = useState(newAgents);

  // Handle changes for both text inputs and checkboxes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Save agent using the saveAgent function, then reload the page
  const handleSave = async () => {
    try {
      const response = await saveAgent(formData);
      console.log('Agent saved:', response.data);
      setFormData(newAgents);
      // Reload the page to reflect the newly added agent
      window.location.reload();
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  return (
    <div
      className="modal fade"
      id="largeModal"
      tabIndex="-1"
      aria-labelledby="largeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="largeModalLabel">New Agent</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            <form>
              <div className="row mb-3">
                {/* First Name */}
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                </div>
                {/* Middle Initial */}
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="initials"
                      placeholder="Middle Initial"
                      value={formData.initials}
                      onChange={handleChange}
                    />
                    <label htmlFor="initials">Middle Initial</label>
                  </div>
                </div>
                {/* Last Name */}
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                </div>
              </div>
              {/* Email Field */}
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              {/* Checkboxes */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="admin"
                  checked={formData.admin}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="super_admin"
                  checked={formData.super_admin}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="super_admin">
                  Super Admin
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="yss"
                  checked={formData.yss}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="yss">
                  YSS
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="credit"
                  checked={formData.credit}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="credit">
                  Credit
                </label>
              </div>
            </form>
          </div>
          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAgentModal;
