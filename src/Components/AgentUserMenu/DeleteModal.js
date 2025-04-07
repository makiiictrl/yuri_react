import React from "react";

export default Delete = () => {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="mdModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="mdModalLabel">
              Delete Agent User Menu
            </h1>
            <button
              className="btn-close py-0"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body dark-modal text-center">
            <h5>Are you sure you want to delete?</h5>
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
