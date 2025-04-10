import React, { useState, useEffect } from "react";
import { showAgentUserMenus } from "../../Services/AgentUserMenusServices";
import { Link } from "react-router-dom";

export default Edit = ({ ModalId }) => {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    showAgentUserMenus(ModalId)
        .then(response => {
          setData(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching data", err);
          setError(err);
          setLoading(false);
        });
    }, [ModalId]);

  return (
    <div className="page-body">
    <div className="row justify-content-center">
        {/* Using a Bootstrap grid column to fix the width */}
        <div className="col-md-4">
          {showAlert && (
            <div 
              className="alert alert-light-secondary alert-dismissible fade show text-dark border-left-wrapper"
              role="alert"
            >
              <i data-feather="help-circle"></i>
              <p>You can check in on some of those fields below.</p>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowAlert(false)}
              ></button>
            </div>
          )}

          <div className="card title-line">
            <div className="card-header">
              <h4 className="mt-1">Agent User Menu Details {data.agent_id}</h4>
            </div>

            <div className="card-body">
              <datalist id="menu"></datalist>
              <datalist id="agent"></datalist>

              <div className="form-group mb-3">
                <label>Menu ID</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-license"></i>
                  </span>
                  <input
                    className="form-control"
                    tabIndex={1}
                    list="menu"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Agent ID</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-user-alt-4"></i>
                  </span>
                  <input
                    className="form-control"
                    tabIndex={1}
                    list="agent"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Grant Access</label>
                <div className="input-group">
                  <div className="col-sm-9 py-2 ms-2">
                    <div className="form-check mb-1">
                      <input
                        className="form-check-input"
                        id="userCreate"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="userCreate">
                        User Create
                      </label>
                    </div>
                    <div className="form-check mb-1">
                      <input
                        className="form-check-input"
                        id="userRead"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="userRead">
                        User Read
                      </label>
                    </div>
                    <div className="form-check mb-1">
                      <input
                        className="form-check-input"
                        id="userUpdate"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="userUpdate">
                        User Update
                      </label>
                    </div>
                    <div className="form-check mb-1">
                      <input
                        className="form-check-input"
                        id="userDelete"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="userDelete">
                        User Delete
                      </label>
                    </div>
                    <div className="form-check mb-1">
                      <input
                        className="form-check-input"
                        id="userPrint"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="userPrint">
                        User Print
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <Link
                  className="btn btn-secondary btn-sm"
                  to="/agent_user_menus"
                >
                  Back
                </Link>
                <button className="btn btn-primary btn-sm" type="button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
