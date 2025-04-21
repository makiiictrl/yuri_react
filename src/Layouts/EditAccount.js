import React from "react";

export default EditAccountModal = () => {
    const { show, onHide } = EditAccountModal;
    return (
        <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Edit Account</h5>
                <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
                {/* Add your form or content here */}
                <p>Form to edit account details goes here.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    );

}
