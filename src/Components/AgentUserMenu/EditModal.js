import React from "react";

export default Edit = () => {
  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="mdModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="mdModalLabel">
              Edit Agent User Menu
            </h1>
            <button
              className="btn-close py-0"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body dark-modal">
            <div
              class="alert alert-light-secondary light alert-dismissible fade show text-dark border-left-wrapper"
              role="alert"
            >
              <i data-feather="help-circle"></i>
              <p>You can check in on some of those fields below.</p>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <div class="card title-line">
              <div class="card-header">
                <h4 className="mt-1">Agent User Menu Details</h4>
              </div>

              <div class="card-body">
                <datalist id="menu"></datalist>
                <datalist id="agent"></datalist>

                <div class="form-group mb-3">
                  <label>Menu ID</label>
                  <div class="input-group">
                    <span class="input-group-text">
                        <i class="icofont icofont-license"></i>
                    </span>
                    <input
                      className="form-control"
                      tabIndex={1}
                      list="menu"
                      autoComplete={false}
                      required
                    />
                  </div>
                </div>

                <div class="form-group mb-3">
                    <label>Agent ID</label>
                  <div class="input-group">
                    <span class="input-group-text">
                        <i class="icofont icofont-user-alt-4"></i>
                    </span>
                    <input
                      className="form-control"
                      tabIndex={1}
                      list="agent"
                      autoComplete={false}
                      required
                    />
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label>Grant Access</label>
                  <div class="input-group">
                    <div class="col-sm-9 py-2 ms-2">
                        <div class="form-check mb-1">
                            <input class="form-check-input" id="userCreate" type="checkbox" value=""/>
                            <label class="form-check-label" for="userCreate">User Create</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" id="userRead" type="checkbox" value=""/>
                            <label class="form-check-label" for="userRead">User Read</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" id="userUpdate" type="checkbox" value=""/>
                            <label class="form-check-label" for="userUpdate">User Update</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" id="userDelete" type="checkbox" value=""/>
                            <label class="form-check-label" for="userDelete">User Delete</label>
                        </div>
                        <div class="form-check mb-1">
                            <input class="form-check-input" id="userPrint" type="checkbox" value=""/>
                            <label class="form-check-label" for="userPrint">User Print</label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              className="btn btn-secondary btn-sm"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button className="btn btn-primary btn-sm" type="button">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
