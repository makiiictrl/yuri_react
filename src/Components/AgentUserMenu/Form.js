import React, { useState, useEffect } from "react";
import { newAgentUserMenus } from "../../Helpers/Models";
import { Typeahead } from "react-bootstrap-typeahead";
import ErrorBoundary from "../ErrorBoundary";
import {
  saveItem,
  showAgentUserMenus,
  menuIdLookUp,
  agentIdLookUp,
} from "../../Services/AgentUserMenusServices";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default Form = ({ ModalId }) => {
  const [data, setData] = useState([newAgentUserMenus]);
  const navigate = useNavigate();
  const [menuOptions, setMenuOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);

  useEffect(() => {
    menuIdLookUp()
      .then((response) => {
        console.log("Success!");
        console.log(response.data);
        setMenuOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching!");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    agentIdLookUp()
      .then((response) => {
        console.log("Success! agents");
        console.log(response.data);
        setAgentOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching!");
        console.error(error);
      });
  }, []);



  const { id } = useParams();

  // For saving
  const handleSave = () => {
    saveItem(data)
      .then((response) => {
        navigate("/agent_user_menus");
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });
  };

  // For existing data fetching for edit
  useEffect(() => {
    showAgentUserMenus(id)
      .then((response) => {
        setData(response.data);
        console.log("Data fetched successfully", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, [id]);

  return (
    <div className="page-body">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card title-line">
            <div className="card-header d-flex align-items-center">
              <i className="icofont icofont-users me-2 text-dark"></i>
              <h4 className="mb-0">Agent User Menu Details</h4>
            </div>

            <div className="card-body">
              <div className="form-group mb-3">
                <label>
                  Menu ID <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-license"></i>
                  </span>
                  {/* Wrap the Typeahead in a flex container */}
                  <div style={{ flex: "1 1 auto" }}>
                    <ErrorBoundary>
                      {menuOptions.length > 0 && (
                        <Typeahead
                          // Remove fixed width classes so it inherits width from its flex container.
                          // Use inputProps to force the inner input to have the form-control styling.
                          inputProps={{ className: "form-control" }}
                          placeholder="Menu ID"
                          onChange={(selected) => {
                            if (selected.length > 0) {
                              const selectedValue = selected[0].split(" - ");
                              const agentMenuId = selectedValue[0]; // Extract ID.
                              const menu = selectedValue.slice(1).join(" - "); // In case there are extra dashes.
                              setData({
                                ...data,
                                agent_menu_id: agentMenuId,
                                menu: menu,
                              });
                            }
                          }}
                          options={menuOptions}
                          // Show the selected value using your desired logic.
                          selected={
                            data.agent_menu_id ? [`${data.agent_menu_id}`] : []
                          }
                          onInputChange={(input) => {
                            const parts = input.split(" - ");
                            const agentMenuId = parts[0];
                            const menu = parts.slice(1).join(" - ") || "";
                            setData({
                              ...data,
                              agent_menu_id: agentMenuId,
                              menu: menu,
                            });
                          }}
                        />
                      )}
                    </ErrorBoundary>
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <label>
                  Agent ID <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-users me-2 text-dark"></i>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <Typeahead
                      inputProps={{ className: "form-control" }}
                      type="number"
                      options={agentOptions}
                      placeholder="Agent ID"
                      required
                      onChange={(selected) => {
                        if (selected.length > 0) {
                          const selectedValue = selected[0].split(" - ");
                          const agentId = selectedValue[0]; // Extract ID.
                          // const agentName = selectedValue.slice(1).join(" - "); // In case there are extra dashes.
                          setData({
                            ...data,
                            agent_id: agentId,
                            // agent_name: meagentNamenu,
                          });
                        }
                      }}
                      selected={
                        data.agent_id ? [`${data.agent_id}`] : []
                      }
                      onInputChange={(input) => {
                        const parts = input.split(" - ");
                        const agentId = parts[0];
                        // const menu = parts.slice(1).join(" - ") || "";
                        setData({
                          ...data,
                          agent_id: agentId,
                          // menu: menu,
                        });
                      }}
                    />
                  </div>
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
                        checked={data.user_create === 1}
                        onChange={(e) =>
                          setData({
                            ...data,
                            user_create: e.target.checked ? 1 : 0,
                          })
                        }
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
                        checked={data.user_read === 1}
                        onChange={(e) =>
                          setData({
                            ...data,
                            user_read: e.target.checked ? 1 : 0,
                          })
                        }
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
                        checked={data.user_update === 1}
                        onChange={(e) =>
                          setData({
                            ...data,
                            user_update: e.target.checked ? 1 : 0,
                          })
                        }
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
                        checked={data.user_delete === 1}
                        onChange={(e) =>
                          setData({
                            ...data,
                            user_delete: e.target.checked ? 1 : 0,
                          })
                        }
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
                        checked={data.user_print === 1}
                        onChange={(e) =>
                          setData({
                            ...data,
                            user_print: e.target.checked ? 1 : 0,
                          })
                        }
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
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
