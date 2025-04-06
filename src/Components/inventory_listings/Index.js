import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default Index = () => {
    const [isShowOpen, setIsShowOpen] = useState(false);
    return (
    <div className="card m-3 p-3">
      <h3 className="text-primary">Listing Inventory</h3>

      <form method="get" action="/inventories" className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <label for="lot_number">Lot Number:</label>
              <input
                id="lot_number"
                name="lot_number"
                type="text"
                className="form-control"
                value=""
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label for="product_description">Product Description:</label>
              <input
                id="product_description"
                name="product_description"
                type="text"
                className="form-control"
                value=""
              />
            </div>
          </div>
          {/* <div className="col-md-2">
                    <% if current_agent.admin? %>
                    <div className="form-group mb-3">
                        <label for="expired_lot_number">Status</label>
                        <!--<div className="form-group mb-3">-->
                        <!--<div className="input-group">-->
                                    <!--<span className="input-group-text">-->
                                        <!--<i className="pli-overtime"></i>-->
                                    <!--</span>-->
                            <%= select_tag "expired_lot_number", options_for_select(@expired_options),
                                        { include_blank: "Please select...", tabindex: 1, class: "form-select" } %>
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                    <% end %>
                </div> */}
          <div className="col-md-2">
            <div className="form-group mt-3 d-flex align-items-center">
              <button type="submit" className="btn btn-primary text-nowrap me-2">
                Show Commercial Stock Inventory
              </button>
              <button
                id="clear_filter"
                type="button"
                className="btn btn-secondary text-nowrap me-2"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="card">
        <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between py-2 px-3">
          <h5 className="mb-0 text-white">Commercial Stock Inventory</h5>
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
            {/* <% if current_agent.admin? %> */}
            <button
              id="download_excel_file"
              type="button"
              className="btn btn-success ml-3"
            >
              Export Details To Excel File
            </button>
            {/* <% end %> */}
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Inventory Type</th>
                <th>Lot Number</th>
                <th>Product Code</th>
                <th>Product Description</th>
                <th>Expiry Date</th>
                <th>Balance</th>
                <th>Remarks</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <% @inventory.each do |inventory| %> */}
              <tr>
                {/* <td><%= inventory.inventory_type %></td>
                            <td><%= inventory.lot_number %></td>
                            <td>
                                <% if inventory.item_code === nil || inventory.item_code == "null" %>
                                &nbsp;
                                <% else %>
                                <%= inventory.item_code %>
                                <% end %>
                            </td>
                            <td><%= inventory.item_description %></td>
                            <td><%= inventory.expiry_date %></td>
                            <td className="text-right">
                                <%= number_with_precision(inventory.inventory_balance_quantity, precision: 3, separator: '.', delimiter: ',') %>
                            </td>
                            <td id="td_<%= inventory.id %>">
                                <% if inventory.compliant.present? %>
                                REMARKS: <%= inventory.compliant %>
                                <% end %>
                                <% if inventory.hold_remarks.present? %>
                                HOLD: <%= inventory.hold_remarks %>
                                <% end %>
                            </td>
                            <td>
                                <% if inventory.id.present? %>
                                <%= link_to 'Show Details', inventory_path(inventory), class: 'btn btn-info btn-sm' %>
                                <% else %>
                                    <span className="text-danger">No Details Available</span>
                                <% end %>
                            </td>
                            <% if current_agent.email.in?(["norberto.ortiz@cathaydrug.com", "raymart.tibajia@ysslab.com", "maricar.picardal@ysslab.com"]) %>
                                <td className="td_add_remarks">
                                <input className="AddRemarks btn btn-primary btn-sm" name="<%= inventory.compliant %>" id="<%= inventory.id %>" type="button" value="Remarks">
                                </td>
                                <td>
                                <%= link_to 'Delete', inventory_path(inventory), method: :delete, data: { confirm: 'Are you sure?' }, class: "btn btn-danger btn-sm" %>
                                </td>
                                <td className="td_add_hold">
                                <input className="AddHold btn btn-secondary btn-sm" name="<%= inventory.hold_remarks %>" id="<%= inventory.id %>" type="button" value="Hold">
                                </td>
                            <% end %> */}

                <td>inventory_type</td>
                <td>lot_number</td>
                <td>item_code</td>
                <td>item_description</td>
                <td>expiry_date</td>
                <td>inventory_balance_quantity</td>
                <td>hold_remarks</td>
                <td>
                    <Link to="/inventory_listings/show" className="btn btn-info btn-sm me-2">Show</Link>
                    <Link className="btn btn-danger btn-sm">Delete</Link>
                </td>
              </tr>
              {/* <% end %> */}
            </tbody>
          </table>
        </div>
      </div>

      <nav className="d-flex justify-content-center mt-4">
        {/* <%= paginate @inventory, class: "pagination justify-content-center" %> */}
      </nav>
    </div>
  );
};
