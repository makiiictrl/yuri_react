import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default Index = () => {
    const [isShowOpen, setIsShowOpen] = useState(false);
    return(
        <div className="card m-3 p-3">
            <h3 className="text-primary">Listing Issuance Slip</h3>
            <form method="get" action="/sample_slip_issuances" className="mb-4">
            <div className="row">
                <div className="col-md-2">
                <div className="form-group">
                    <label htmlFor="issuance_number">Issuance Number:</label>
                    <input id="issue_slip_number" name="issue_slip_number" type="text" className="form-control" value=""/>
                </div>
                </div>
                <div className="col-md-2">
                <div className="form-group">
                    <label htmlFor="request_date">Request Slip Number:</label>
                    <input id="request_slip_number" name="request_slip_number" type="text" className="form-control" value=""/>
                </div>
                </div>
                <div className="col-md-2">
                <div className="form-group">
                    <label htmlFor="issuance_date">Issuance Date:</label>
                    <input id="issuance_date" name="issuance_date" type="date" className="form-control" value=""/>
                </div>
                </div>
                <div className="col-md-2">
                <div className="form-group mt-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary text-nowrap me-2">Show Issue Slip</button>
                    <button id="clear_filter" type="button" className="btn btn-secondary text-nowrap">Clear Filter</button>
                </div>
                </div>
            </div>
            </form>

            <div className="card">
            <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between py-2 px-3">
                <h5 className="mb-0 text-white">Slip Issuances</h5>
                <div className="d-flex align-items-center ms-auto gap-2">
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-light dropdown-toggle btn-md ${
                        isShowOpen ? "show" : ""
                        }`}
                        onClick={() => setIsShowOpen((prev) => !prev)}
                        onBlur={() => setIsShowOpen((prev) => !prev)}
                        aria-expanded={isShowOpen}
                    >
                        Show only
                    </button>
                    <ul
                        className={`dropdown-menu ${isShowOpen ? "show" : ""}`}
                        style={{
                        position: "absolute",
                        inset: "40px auto auto 0px",
                        margin: "0px",
                        // width: 'fit-content',
                        minWidth: "105px",
                        transform: isShowOpen
                            ? "translateY(0px)"
                            : "translateY(20px)",
                        opacity: isShowOpen ? 1 : 0,
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        }}
                        data-popper-placement="bottom-start"
                    >
                        {/* <li><%= link_to "1", new_agent_user_menu_path(per_page: 1, agent_id: @agent_id, menu_description: @menu_description), class: "dropdown-item", data: { turbo: "false" } %></li>
                            <li><%= link_to "2", new_agent_user_menu_path(per_page: 1, agent_id: @agent_id, menu_description: @menu_description), class: "dropdown-item", data: { turbo: "false" } %></li>
                            <li><%= link_to "5", new_agent_user_menu_path(per_page: 1, agent_id: @agent_id, menu_description: @menu_description), class: "dropdown-item", data: { turbo: "false" } %></li> */}
                        <li className="dropdown-item">10</li>
                        <li className="dropdown-item">30</li>
                        <li className="dropdown-item">50</li>
                    </ul>
                    </div>
                {/* <%= link_to 'New Issue Slip', new_sample_slip_issuance_path, class: 'btn btn-success ml-3' %> */}
                <Link to="/issue_slips/new" className="btn btn-success ml-3" >New Issue Slip</Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                    <th>No.</th>
                    <th>Comp</th>
                    <th>Issuance Number</th>
                    <th>Request Number</th>
                    {/* <!--<th>Document Type</th>--> */}
                    <th>Issuance Date</th>
                    <th>Employee Name</th>
                    <th>Address</th>
                    <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {/* <% if @sample_slip_issuances.present? %> */}
                    {/* <% @sample_slip_issuances.each_with_index do |sample_slip_issuance, index| %> */}
                    <tr>
                        {/* <td><%= ((@sample_slip_issuances.current_page - 1) * @sample_slip_issuances.limit_value) + index + 1 %></td> */}
                        {/* <% if sample_slip_issuance.company_code == 1 %>
                        <td>CDCI</td>
                        <% else %>
                        <td>CYDC</td>
                        <% end %>
                        <td><%= sample_slip_issuance.issuance_number %></td>
                        <td><%= sample_slip_issuance.request_number %></td>
                        <!--<td><#%= sample_slip_issuance.document_type %></td>-->

                        <td><%= sample_slip_issuance.issuance_date %></td>
                        <td><%= sample_slip_issuance.employee_name %></td>
                        <td><%= sample_slip_issuance.address %></td>
                        <td>
                        <%= link_to 'Show', sample_slip_issuance, class: 'btn btn-info btn-sm' %>
                        <%= link_to 'Edit', edit_sample_slip_issuance_path(sample_slip_issuance), class: 'btn btn-warning btn-sm ml-2' %>
                        </td> */}
                        <td>No</td>
                        <td>company_code</td>
                        <td>issuance_number</td>
                        <td>request_number</td>
                        {/* <td>document_type</td> */}
                        <td>issuance_date</td>
                        <td>employee_name</td>
                        <td>address</td>
                        <td>
                            <Link to="/issue_slips/show" className="btn btn-info btn-sm">Show</Link>
                            <Link to="/issue_slips/edit" className="btn btn-warning btn-sm ms-2">Edit</Link>
                        </td>
                    </tr>
                    {/* <% end %>
                <% end %> */}
                </tbody>
                </table>
            </div>
            </div>
            {/* <!-- Pagination --> */}
            <nav className="d-flex justify-content-center mt-4">
            {/* <%= paginate @sample_slip_issuances, :class => "pagination justify-content-center" %> */}
            </nav>
        </div>
    )
}