// EditAgentModal.js
import React, { useState, useEffect } from "react";
import { newAgents } from "../../Helpers/Models";
import { updateAgent } from "../../Services/DashboardServices";

const EditAgentModal = ({ agentToEdit }) => {
  const [formData, setFormData] = useState(newAgents);

  useEffect(() => {
    if (agentToEdit) {
      // Merge defaults with received data to ensure all keys exist
      setFormData({ ...newAgents, ...agentToEdit });
    }
  }, [agentToEdit]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    // Map the unique edit IDs back to the original key names:
    const key = id.startsWith("edit_") ? id.replace("edit_", "") : id;
    setFormData((prevData) => ({
      ...prevData,
      [key]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Assuming agentToEdit has an 'id' property
      const response = await updateAgent(formData.id, formData);
      console.log("Agent updated:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating agent:", error);
    }
  };

  if (!formData) return null;

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Edit Agent</h5>
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
                      id="edit_first_name"
                      placeholder="First Name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                    />
                    <label htmlFor="edit_first_name">First Name</label>
                  </div>
                </div>
                {/* Middle Initial */}
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="edit_initials"
                      placeholder="Middle Initial"
                      value={formData.initials || ""}
                      onChange={handleChange}
                    />
                    <label htmlFor="edit_initials">Middle Initial</label>
                  </div>
                </div>
                {/* Last Name */}
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="edit_last_name"
                      placeholder="Last Name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                    />
                    <label htmlFor="edit_last_name">Last Name</label>
                  </div>
                </div>
              </div>
              {/* Email Field */}
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="edit_email"
                    placeholder="example@example.com"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="edit_email">Email address</label>
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="edit_password"
                    placeholder="Password"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="edit_password">Password</label>
                </div>
              </div>
              {/* Checkboxes */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="edit_admin"
                  checked={!!formData.admin}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="edit_admin">
                  Admin
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="edit_super_admin"
                  checked={!!formData.super_admin}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="edit_super_admin">
                  Super Admin
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="edit_yss"
                  checked={!!formData.yss}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="edit_yss">
                  YSS
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="edit_credit"
                  checked={!!formData.credit}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="edit_credit">
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
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgentModal;
