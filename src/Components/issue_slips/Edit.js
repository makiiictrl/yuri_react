import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default Edit = () => {
  const [sampleTabShow, setSampleTabShow] = useState(true);
  const [promatsTabShow, setPromatsTabShow] = useState(false);
  const [packmatsTabShow, setPackmatsTabShow] = useState(false);
  const [commercialTabShow, setCommercialTabShow] = useState(false);
  return (
    <div className="container nifty-container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-white">Editing Issuance Slip</h4>
        </div>

        <div className="card-body">
          {/* <%= form_for(@sample_slip_issuance) do |f| %> */}
          <form>
            {/* <% if @sample_slip_issuance.errors.present? %>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <h4 className="alert-heading">
                        <%= pluralize(@sample_slip_issuance.errors.count, "error") %> prevented this request from being saved:
                        </h4>
                        <ul className="mb-0">
                        <% @sample_slip_issuance.errors.full_messages.each do |message| %>
                            <li><%= message %></li>
                        <% end %>
                        </ul>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <% end %> */}

            {/* <!-- Issuance Details Group --> */}
            <div className="mb-4">
              <div className="col-md-12">
                <h5 className="mb-3 border-bottom pb-2">Issuance Details</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      {/* <%= f.label :company_code %> */}
                      <label>Company Code</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="pli-building"></i>
                        </span>
                        {/* <%= f.select :company_code, LOAD_COMPANY_CODE, {}, { :tabindex => 1, :class => "form-select" } %> */}
                        <select className="form-select">
                          <option value="">Please select...</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          {/* <%= f.label :request_number %> */}
                          <label>Request Number</label>
                          <div className="form-group mb-3">
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="pli-file"></i>
                              </span>
                              {/* <%= f.text_field :request_number, { :tabindex => 1, :required => true, :class => "form-control", :readonly => true } %> */}
                              <input
                                type="text"
                                className="form-control"
                                tabIndex={1}
                                required
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!--<div className="col-md-6">-->
                                <!--<div className="form-group mb-6">-->
                                <!--<#%= f.label :document_type %>-->
                                <!--<div className="form-group mb-3">-->
                                    <!--<div className="input-group">-->
                                        <!--<span className="input-group-text">-->
                                        <!--<i className="pli-file"></i>-->
                                        <!--</span>-->
                                    <!--<#%= f.text_field :document_type, { :tabindex => 1, :required => true, :class => "form-select", :readonly => true } %>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                            <!--</div>--> */}
                    </div>

                    <div className="row">
                      <div className="col-md-6" id="hidden">
                        <div className="form-group mb-3">
                          {/* <%= f.label :issuance_number %> */}
                          <label>Issuance Number</label>
                          <div className="form-group mb-3">
                            <div className="input-group">
                              {/* <%= f.text_field :issuance_number, :tabindex => 1, :class => "form-control", :readonly => true %> */}
                              <input
                                type="text"
                                tabIndex={1}
                                className="form-control"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-6">
                          {/* <%= f.label :issuance_date %>
                                <%= f.date_field :issuance_date, :class => "form-control", :required => true %> */}
                          <label>Issuance Date</label>
                          <input
                            type="date"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      {/* <%= f.label :deliver_to %>
                            <%= f.hidden_field :deliver_to, :class => "form-control", :required => true, :autocomplete => "off" %>
                            <%= f.text_field :customer_name, :class => "form-control", :required => true, :autocomplete => "off", :list => "customer_datalist" %>
                            <%= f.hidden_field :customer_number, :class => "form-control", :required => true, :autocomplete => "off" %> */}
                      <label>Deliver To</label>
                      <input
                        type="hidden"
                        name="deliver_to"
                        required
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        name="customer_name"
                        className="form-control"
                        required
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        required
                        autoComplete="off"
                      />
                      <datalist id="customer_datalist"></datalist>
                    </div>
                    <div className="form-group mb-3">
                      {/* <%= f.label :address %>
                            <%= f.text_field :address, :class => "form-control", :required => true, :autocomplete => "off" %> */}
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group mb-3">
                      {/* <%= f.label :employee_name, "Employee Name" %>
                            <%= f.text_field :employee_name, :class => "form-control", :required => true, :list => "employee_name", :autocomplete => "off"%>
                            <%= f.hidden_field :employee_number %>
                            <!--<#%= f.hidden_field :territory_code %>-->
                            <!--<#%= f.hidden_field :team %>--> */}
                      <label>employee_name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        list="employee_name"
                        autoComplete=""
                      />
                      <input type="hidden" className="employee_name" />

                      <datalist id="employee_name"></datalist>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Approval Group --> */}
            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Approval Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    {/* <%= f.label :recommended_by %> */}
                    <label>Recommended by</label>
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="pli-male"></i>
                        </span>
                        {/* <%= f.select :recommended_by, @sample_slip_issuance_recommended_by,
                                            { :include_blank => "Please select..." },
                                            { :tabindex => 1, :required => true, :class => "form-select" } %> */}
                        <select className="form-control">
                          <option value="">Please select...</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    {/* <%= f.label :prepared_by %> */}
                    <label>Prepared by</label>
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="pli-male"></i>
                        </span>
                        {/* <%= f.text_field :prepared_by, :class => "form-control", :required => true, :readonly => true %> */}
                        <input
                          type="text"
                          className="form-control"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    {/* <%= f.label :endorsed_by %> */}
                    <label>Endorsed by</label>
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="pli-administrator"></i>
                        </span>
                        {/* <%= f.select :endorsed_by, @sample_slip_issuance_endorsed_by,
                                            { :include_blank => "Please select..." },
                                            { :tabindex => 1, :required => true, :class => "form-select" } %> */}
                        <select className="form-select">
                          <option value="">Please select...</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    {/* <%= f.label :approved_by %> */}
                    <label>Approved by</label>
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="pli-administrator"></i>
                        </span>
                        {/* <%= f.select :approved_by, @sample_slip_issuance_approved_by,
                                            { :include_blank => "Please select..." },
                                            { :tabindex => 1, :required => true, :class => "form-select" } %> */}
                        <select className="form-select">
                          <option value="">Please select...</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Product Details Group --> */}
            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Product Details</h5>

              {/* <!-- Tabs Navigation --> */}
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sampleTabShow ? "active" : ""}`}
                    id="sample-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#sample"
                    type="button"
                    role="tab"
                    aria-controls="sample"
                    aria-selected={sampleTabShow}
                    onClick={()=>{
                        setSampleTabShow(true)
                        setCommercialTabShow(false)
                        setPackmatsTabShow(false)
                        setPromatsTabShow(false)
                    }}
                  >
                    Sample
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                        promatsTabShow ? "active" : ""
                      }`}
                    id="promats-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#promats"
                    type="button"
                    role="tab"
                    aria-controls="promats"
                    aria-selected={promatsTabShow}
                    onClick={()=>{
                        setSampleTabShow(false)
                        setCommercialTabShow(false)
                        setPackmatsTabShow(false)
                        setPromatsTabShow(true)
                    }}
                  >
                    Promats
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                        packmatsTabShow ? "active" : ""
                      }`}
                    id="packmats-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#packmats"
                    type="button"
                    role="tab"
                    aria-controls="packmats"
                    aria-selected={promatsTabShow}
                    onClick={()=>{
                        setSampleTabShow(false)
                        setCommercialTabShow(false)
                        setPackmatsTabShow(true)
                        setPromatsTabShow(false)
                    }}
                  >
                    Packmats
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                        commercialTabShow ? "active" : ""
                      }`}
                    id="commercial-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#commercial"
                    type="button"
                    role="tab"
                    aria-controls="commercial"
                    aria-selected={commercialTabShow}
                    onClick={()=>{
                        setSampleTabShow(false)
                        setCommercialTabShow(true)
                        setPackmatsTabShow(false)
                        setPromatsTabShow(false)
                    }}
                  >
                    Commercial
                  </button>
                </li>
              </ul>

              <datalist id="sample_products"></datalist>
              <datalist id="promats_products"></datalist>
              <datalist id="packmats_products"></datalist>
              <datalist id="commercial_products"></datalist>

              {/* <!-- Tabs Content --> */}
              <div className="tab-content mt-3" id="productTabsContent">
                <div
                  className={`tab-pane fade ${
                    sampleTabShow ? "active show" : ""
                  }`}
                  id="sample"
                  role="tabpanel"
                  aria-labelledby="sample-tab"
                >
                  <table
                    id="TableDetails_Sample"
                    className="table table-bordered table-hover mt-3"
                  >
                    <thead>
                      <tr>
                        <th>Product Description</th>
                        <th>Lot Number</th>
                        <th>Expiry Date</th>
                        <th>Quantity</th>
                        <th>Approved Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <% if @sample_slip_issuance_details_sample.present? %>
                            <%= hidden_field_tag("DetailCounter",@sample_slip_issuance_details_sample.count)%>
                            <% @sample_slip_issuance_details_sample.each do |detail| %> */}
                      <tr>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][product_description]",
                                                    detail["product_description"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Description"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][lot_number]",
                                                    detail["lot_number"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Lot Number"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][expiry_date]",
                                                    detail["expiry_date"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="date"
                            className="form-control"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][request_quantity]",
                                                    detail["ordered_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Ordered Quantuty"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][approved_quantity]",
                                                    detail["approved_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Approved Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn delete-btn btn-danger bg-danger"
                            id="<%= detail.id %>"
                            value="Delete"
                          />
                        </td>
                      </tr>
                      {/* <% end %> */}
                      {/* <% end %> */}
                    </tbody>
                  </table>

                  <input type="hidden" id="DetailCounterSample" />
                </div>
                <div
                  className={`tab-pane fade ${
                    promatsTabShow ? "active show" : ""
                  }`}
                  id="promats"
                  role="tabpanel"
                  aria-labelledby="promats-tab"
                >
                  <table
                    id="TableDetails_Promats"
                    className="table table-bordered table-hover mt-3"
                  >
                    <thead>
                      <tr>
                        <th>Product Description</th>
                        <th>Lot Number</th>
                        <th>Expiry Date</th>
                        <th>Quantity</th>
                        <th>Approved Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <% if @sample_slip_issuance_details_promats.present? %>
                            <%= hidden_field_tag("DetailCounter",@sample_slip_issuance_details_promats.count)%>
                            <% @sample_slip_issuance_details_promats.each do |detail| %> */}
                      <tr>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][product_description]",
                                                    detail["product_description"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Description"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][lot_number]",
                                                    detail["lot_number"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Lot Number"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][expiry_date]",
                                                    detail["expiry_date"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="date"
                            className="form-control"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][request_quantity]",
                                                    detail["ordered_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ordered Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][approved_quantity]",
                                                    detail["approved_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Approved Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn delete-btn btn-danger bg-danger"
                            id="<%= detail.id %>"
                            value="Delete"
                          />
                        </td>
                      </tr>
                      {/* <% end %>
                            <% end %> */}
                    </tbody>
                  </table>
                  <input type="hidden" id="DetailCounterPromats" />
                </div>
                <div
                  className={`tab-pane fade ${
                    packmatsTabShow ? "active show" : ""
                  }`}
                  id="packmats"
                  role="tabpanel"
                  aria-labelledby="packmats-tab"
                >
                  <table
                    id="TableDetails_Packmats"
                    className="table table-bordered table-hover mt-3"
                  >
                    <thead>
                      <tr>
                        <th>Product Description</th>
                        <th>Lot Number</th>
                        <th>Expiry Date</th>
                        <th>Quantity</th>
                        <th>Approved Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <% if @sample_slip_issuance_details_packmats.present? %>
                            <%= hidden_field_tag("DetailCounter",@sample_slip_issuance_details_packmats.count)%>
                            <% @sample_slip_issuance_details_packmats.each do |detail| %> */}
                      <tr>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][product_description]",
                                                    detail["product_description"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Description"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][lot_number]",
                                                    detail["lot_number"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Lot Number"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][expiry_date]",
                                                    detail["expiry_date"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="date"
                            className="form-control"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][request_quantity]",
                                                    detail["ordered_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Request Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][approved_quantity]",
                                                    detail["approved_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Approved Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn delete-btn btn-danger bg-danger"
                            id="<%= detail.id %>"
                            value="Delete"
                          />
                        </td>
                      </tr>
                      {/* <% end %>
                            <% end %> */}
                    </tbody>
                  </table>
                  <input type="hidden" id="DetailCounterPackmats" />
                </div>
                <div
                  className={`tab-pane fade ${
                    commercialTabShow ? "active show" : ""
                  }`}
                  id="commercial"
                  role="tabpanel"
                  aria-labelledby="commercial-tab"
                >
                  <table
                    id="TableDetails_Commercial"
                    className="table table-bordered table-hover mt-3"
                  >
                    <thead>
                      <tr>
                        <th>Product Description</th>
                        <th>Lot Number</th>
                        <th>Expiry Date</th>
                        <th>Quantity</th>
                        <th>Approved Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <% if @sample_slip_issuance_details_commercial.present? %>
                            <%= hidden_field_tag("DetailCounter",@sample_slip_issuance_details_commercial.count)%>
                            <% @sample_slip_issuance_details_commercial.each do |detail| %> */}
                      <tr>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][product_description]",
                                                    detail["product_description"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product DescriptioN"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][lot_number]",
                                                    detail["lot_number"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Lot Number"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][expiry_date]",
                                                    detail["expiry_date"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="date"
                            className="form-control"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][request_quantity]",
                                                    detail["ordered_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Request Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          {/* <%= text_field_tag "sample_slip_issuance_details[][approved_quantity]",
                                                    detail["approved_quantity"], :class => "form-control", :disabled => true %> */}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Approved Quantity"
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn delete-btn btn-danger bg-danger"
                            id="<%= detail.id %>"
                            value="Delete"
                          />
                        </td>
                      </tr>
                      {/* <% end %>
                            <% end %> */}
                    </tbody>
                  </table>
                  <input type="hidden" id="DetailCounterCommercial" />
                </div>
              </div>
            </div>

            {/* <!-- Submit Button --> */}
            <div className="d-flex justify-content-between">
              {/* <%= link_to "Back", sample_slip_issuances_path, :class => "btn btn-secondary" %> */}
              {/* <%= f.submit "Save Issue Slip", :class => "btn btn-success" %> */}
              <Link to="/issue_slips" className="btn btn-secondary">
                Back
              </Link>
              <Link className="btn btn-success">Save</Link>
            </div>
          </form>
          {/* <% end %> */}
        </div>
      </div>
    </div>
  );
};
