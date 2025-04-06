import React from "react";
import { Link } from "react-router-dom";

export default Show = () => {
    return(
        <div className="container nifty-container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                <h4 className="mb-0 text-white">Slip Issuance Details</h4>
                </div>
                <div className="card-body">
                {/* <!-- Request Information Table --> */}
                <div className="table-responsive mb-4">
                    <input type="hidden" id="issue-slip-id" value="<%= @sample_slip_issuance.id %>"/>
                    <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>Company:</th>
                            {/* <td><%= @company_code_select["#{@sample_slip_issuance.company_code}"] %></td> */}
                            <td>company_code</td>
                        </tr>
                        <tr>
                            <th>Request Number:</th>
                            {/* <td><%= @sample_slip_issuance.request_number %></td> */}
                            <td>request_number</td>
                        </tr>
                        <tr>
                            <th>Issue Slip Number:</th>
                            {/* <td><%= @sample_slip_issuance.issuance_number %></td> */}
                            <td>issue_slip_number</td>
                        </tr>
                        <tr>
                            <th>Issue Slip Date:</th>
                            {/* <td><%= @sample_slip_issuance.issuance_date %></td> */}
                            <td>issue_slip_date</td>
                        </tr>
                        <tr>
                            <th>Deliver To:</th>
                            {/* <td><%= @sample_slip_issuance.customer_number %> <%= @sample_slip_issuance.deliver_to %></td> */}
                            <td>deliver_to</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            {/* <td><%= @sample_slip_issuance.address %></td> */}
                            <td>address</td>
                        </tr>
                        <tr>
                            <th>Employee Name:</th>
                            {/* <td><%= @sample_slip_issuance.employee_number %> <%= @sample_slip_issuance.employee_name %></td> */}
                            <td>employee_name</td>
                        </tr>
                        {/* <!--<tr>-->
                            <!--<th>Subject:</th>-->
                            <!--<td><#%= @sample_slip_issuance.subject %></td>-->
                        <!--</tr>--> */}
                        <tr>
                            <th>Prepared By:</th>
                            {/* <td><%= @sample_slip_issuance.prepared_by %></td> */}
                            <td>prepared_by</td>
                        </tr>
                        <tr>
                            <th>Recommended By:</th>
                            {/* <td><%= @sample_slip_issuance.recommended_by %></td> */}
                            <td>recommended_by</td>
                        </tr>
                        <tr>
                            <th>Endorsed By:</th>
                            {/* <td><%= @sample_slip_issuance.endorsed_by %></td> */}
                            <td>endorsed_by</td>
                        </tr>
                        <tr>
                            <th>Approved By:</th>
                            {/* <td><%= @sample_slip_issuance.approved_by %></td> */}
                            <td>approved_by</td>
                        </tr>   
                        </tbody>
                    </table>
                </div>

                {/* <!-- Product Details Table --> */}
                <div className="table-responsive mb-4">
                    <h5 className="mb-3 border-bottom pb-2">Product Details</h5>
                    <table id="TableDetails" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th>Item Description</th>
                        <th>Request Type</th>
                        <th>Lot Number</th>
                        <th>Expiry Date</th>
                        <th>Quantity</th>
                        <th>Approved Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <% if @sample_slip_issuance_details.any? %>
                        <% @sample_slip_issuance_details.each do |sample_slip_issuance_detail| %> */}
                            <tr>
                            {/* <td><%= sample_slip_issuance_detail["product_description"] %></td>
                            <td><%= sample_slip_issuance_detail["issue_slip_type"] %></td>
                            <td><%= sample_slip_issuance_detail["lot_number"] %></td>
                            <td><%= sample_slip_issuance_detail["expiry_date"] %></td>
                            <td><%= number_with_precision(sample_slip_issuance_detail["ordered_quantity"], precision: 1, separator: '.', delimiter: ',') %></td>
                            <td><%= number_with_precision(sample_slip_issuance_detail["approved_quantity"], precision: 1, separator: '.', delimiter: ',') %></td> */}
                            <td>product_description</td>
                            <td>issue_slip_type</td>
                            <td>lot_number</td>
                            <td>expiry_date</td>
                            <td>ordered_quantity</td>
                            <td>approved_quantity</td>
                            </tr>
                        {/* <% end %>
                    <% else %> */}
                        <tr>
                        <td colSpan="6" className="text-center pt-4">
                            <p>No Records of Sample Slip Issuance Details</p>
                        </td>
                        </tr>
                    {/* <% end %> */}
                    </tbody>
                    </table>
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="d-flex justify-content-between">
                    {/* <%= link_to 'Back', sample_slip_issuances_path, class: 'btn btn-secondary' %> */}
                    <Link to="/issue_slips" className="btn btn-secondary">Back</Link>
                    <div>
                    {/* <%= link_to 'Edit', edit_sample_slip_issuance_path(@sample_slip_issuance), class: 'btn btn-warning' %> */}
                    <Link to="/issue_slips/edit" className="btn btn-warning me-2">Edit</Link>
                    <input type="button" className="btn btn-info" id="print-issue-slip" value="Print"/>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}