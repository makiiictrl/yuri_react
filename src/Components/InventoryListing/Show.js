import React, { useState, useEffect } from "react";

export default Show = () => {
    return(
        <div className="nifty-container container-fluid mt-4">
            {/* <h3 className="text-primary">Commercial Stock Transaction Details</h3> */}

            {/* Transaction Information Card */}
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0 text-white">Transaction Information</h4>
                </div>
                <div className="card-body">
                {/* Transaction Information Table */}
                <table className="table table-bordered table-hover">
                    <tr>
                        <th>Product:</th>
                        <td>{/* <%= @bin_card_inventorys.product_description %> */}</td>
                    </tr>
                    <tr>
                        <th>Lot Number:</th>
                        <td>{/* <%= @bin_card_inventorys[:lot_number] %> */}</td>
                    </tr>
                    <tr>
                        <th>Expiry Date:</th>
                            <td>
                                {/* <% if @bin_card_inventorys[:expiry_date].present? %> */}
                                    {/* <%= Date.parse(@bin_card_inventorys[:expiry_date].to_s).strftime("%B %Y") %> */}
                                {/* <% end %> */}
                                {/* <% if @bin_card_inventorys[:manufacturing_date].present? %> */}
                                    / MFG DATE: {/* <%= Date.parse(@bin_card_inventorys[:manufacturing_date].to_s).strftime("%B %Y") %> */}
                                {/* <% end %> */}
                            </td>
                    </tr>
                    <tr>
                        <th>Storage Condition:</th>
                        <td>{/* <%= @bin_card_inventorys[:storage_condition] %> */}</td>
                    </tr>
                    <tr>
                        <th>Balance Quantity:</th>
                        <td>
                            {/* <%= number_with_precision(@last_balance_quantity, precision: 0, separator: '.', delimiter: ',') %> */}
                        </td>
                    </tr>
                </table>

                <input
                    id="add_bin_card_inventory_details"
                    type="button"
                    value="Add Commercial Stock Transaction"
                    className="btn btn-success"
                />

                <div className="table-responsive mb-3">
                    <table className="table table-bordered table-hover mt-4" id="table_details">
                    <thead>
                        <tr>
                        <th>Document type</th>
                        <th>Document date</th>
                        <th>Record date</th>
                        <th>Reference</th>
                        <th>Receipts</th>
                        <th>Particular</th>
                        <th>Quantity</th>
                        <th>Quantity Free</th>
                        <th>Balance</th>
                        <th nowrap>Issued by</th>
                        {/* <% if current_agent.email == "norberto.ortiz@cathaydrug.com" || current_agent.email == "raymart.tibajia@ysslab.com" || current_agent.email == "maricar.picardal@ysslab.com" %> */}
                            <th>Encoded date</th>
                        {/* <% end %> */}

                        {/* <% if current_agent.admin? || current_agent.yss? %> */}
                            <th nowrap colSpan="2">Actions</th>
                        {/* <% end %> */}

                        {/*
                        <% 
                            @last_closing_id = 0
                            @last_closing_date_created_at = Date.today.strftime("%Y-%m-%d")

                            @last_closing_date = @bin_card_inventory_details.where(:issued_by => "closing").last
                            if @last_closing_date.present?

                            @last_closing_id = @last_closing_date.id
                            @last_closing_date_created_at = @last_closing_date.created_at.strftime("%Y-%m-%d")
                            end
                        %>
                        */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <% @bin_card_inventory_details.each do |bin_cards_details| %> */}
                        <tr>
                        <td nowrap>
                            {/* <%#= bin_card_inventory_document_type_select[bin_cards_details.bin_card_inventory_type] %> */}
                            {/* <%= bin_cards_details.bin_card_inventory_type.to_i > 0 ? @bin_card_inventory_document_type_select[bin_cards_details.bin_card_inventory_type] : bin_cards_details.bin_card_inventory_type %> */}
                        </td>
                        <td>{/* <%= bin_cards_details.bin_card_inventory_date.present? ? Date.parse(bin_cards_details.bin_card_inventory_date.to_s).strftime("%m/%d/%y") : "" %> */}</td>
                        <td>{/* <%= bin_cards_details.document_date.present? ? Date.parse(bin_cards_details.document_date.to_s).strftime("%m/%d/%y") : "" %> */}</td>
                        <td>{/* <%= bin_cards_details.reference_number %> */}</td>
                        <td className="amount_right">
                            {/* <%= bin_cards_details.received_quantity.to_i > 0 ? "#{number_with_precision(bin_cards_details.received_quantity, precision: 0, separator: '.', delimiter: ',')}" : ""%> */}
                        </td>
                        <td nowrap>{/* <%= bin_cards_details.particular %> */}</td>
                        <td className="amount_right">
                            {/* <%= bin_cards_details.issued_quantity.to_f > 0.00 ? "#{number_with_precision(bin_cards_details.issued_quantity, precision: 3, separator: '.', delimiter: ',')}" : ""%> */}
                        </td>
                        {/*
                        <td className="amount_right">
                            <%#= "#{number_with_precision(bin_cards_details.balance_quantity, precision: 0, separator: '.', delimiter: ',')}"%>
                        </td>
                        */}
                        {/* <% #if bin_cards_details.balance_quantity % 1 != 0 %> */}
                        <td nowrap>{/* <%= bin_cards_details.free_quantity %> */}</td>
                        <td className="amount_right">
                            {/* <%= "#{number_with_precision(bin_cards_details.balance_quantity, precision: 3, separator: '.', delimiter: ',')}"%> */}
                        </td>
                        {/* <% #end  %> */}
                        <td>{/* <%= bin_cards_details.issued_by %> */}</td>
                        {/* <%= @total_closing_date  = Date.parse(bin_cards_details.created_at.strftime("%Y-%m-%d")) - Date.parse(@last_closing_date_created_at)  %> */}
                        {/* <%= @closing_id  = bin_cards_details.id - @last_closing_id %> */}
                        </tr>

                        {/* 
                        <% if current_agent.email == "norberto.ortiz@cathaydrug.com" %>
                        */}
                        <tr>
                        <td colSpan="100%">
                            <table>
                            <tbody>
                                <tr>
                                {/* <% if current_agent.email == "norberto.ortiz@cathaydrug.com" %> */}
                                <td nowrap>
                                    {/* <% if bin_cards_details.bin_card_inventory_type.to_i != 13 %> */}
                                    
                                    <input
                                        className="detail_delete btn btn-warning"
                                        id="{/* <%= bin_cards_details.id %> */}"
                                        type="button"
                                        value="Delete"
                                    /> |
                                    
                                    {/* <% end %> */}
                                </td>
                                {/* <% end %> */}
                                {/* <% if current_agent.email == "norberto.ortiz@cathaydrug.com" || current_agent.email == "raymart.tibajia@ysslab.com" || current_agent.email == "maricar.picardal@ysslab.com" %> */}
                                <td>
                                    {/* <%= bin_cards_details.created_at.strftime("%m/%d/%y") %> */}
                                </td>
                                <td nowrap>
                                    {/* <% if bin_cards_details.bin_card_inventory_type.to_i != 13 %> */}
                                    <input
                                    className="detail_edit btn btn-info"
                                    id="{/* <%= bin_cards_details.id %> */}"
                                    type="button"
                                    value="  Edit  "
                                    />{" "}
                                    |{" "}
                                    <input
                                    className="detail_delete_row btn btn-danger"
                                    id="{/* <%= bin_cards_details.id %> */}"
                                    type="button"
                                    value="Delete Row"
                                    />
                                    {/* <% else %> */}
                                    <input
                                    className="detail_edit btn btn-info"
                                    id="{/* <%= bin_cards_details.id %> */}"
                                    type="button"
                                    value="  Edit  "
                                    />
                                    {/* <% end %> */}
                                    {/* <% if current_agent.email == "norberto.ortiz@cathaydrug.com" %> */}
                                    {/* <% if bin_cards_details.id ==  bin_cards_details_id_last %> */}
                                    <br />
                                    {/* <%= select_tag("move_after_document_type",options_for_select(@bin_card_inventory_document_type),:id => "move_after_document_type", :prompt => "Please select...", :tabindex => 2)%> */}
                                    <input
                                    className="move_after_reference"
                                    id="bin_card_inventory_reference"
                                    name="bin_card_inventory_reference"
                                    tabIndex="2"
                                    type="text"
                                    value=""
                                    />
                                    <input
                                    id="{/* <%= bin_cards_details.id %> */}"
                                    type="button"
                                    value="Move After"
                                    className="move_after_save_details btn btn-primary"
                                    tabIndex="2"
                                    />
                                    {/* <% end %> */}
                                    {/* <% end %> */}
                                </td>
                                {/* <% else %> */}
                                <td></td>
                                {/* <% end %> */}
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                        <input
                        className="form-control"
                        type="hidden"
                        id="inventory_id"
                        name="bin_cardinventory[][bin_card_inventory_id]"
                        tabIndex="2"
                        value="{/* <%= @bin_card_inventorys.id %> */}"
                        />
                        {/* <% end %> */}
                        <tr id="TableAddDetails_new">
                        <td>
                            {/* <%= select_tag("bin_card_inventory[][document_type]",options_for_select(@bin_card_inventory_document_type),:id => "bin_card_inventory_document_type", :prompt => "Please select...", :class => "form-select", :tabindex => 2)%> */}
                        </td>
                        {/* <td>
                            <input
                            className="bin_card_inventory_document_type"
                            id="bin_card_inventory_document_type"
                            name="bin_card_inventory[][document_type]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td> */}
                        <td>
                            <input
                            className="form-control bin_card_inventory_document_date form-controltextbox-n"
                            id="bin_card_inventory_document_date"
                            name="bin_card_inventory[document_date]"
                            tabIndex="2"
                            type="text"
                            value=""
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_record_date textbox-n"
                            id="bin_card_inventory_record_date"
                            name="bin_card_inventory[record_date]"
                            tabIndex="2"
                            type="text"
                            value=""
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_reference"
                            id="bin_card_inventory_reference"
                            name="bin_card_inventory[][reference]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_received_quantity"
                            id="bin_card_inventory_received_quantity"
                            name="bin_card_inventory[][received_quantity]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_particular"
                            id="bin_card_inventory_particular"
                            name="bin_card_inventory[][particular]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_quantity"
                            id="bin_card_inventory_quantity"
                            name="bin_card_inventory[][quantity]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_quantity_free"
                            id="bin_card_inventory_quantity_free"
                            name="bin_card_inventory[][quantity_free]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_balance"
                            id="bin_card_inventory_balance"
                            name="bin_card_inventory[][balance]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input
                            className="form-control bin_card_inventory_issued_by"
                            id="bin_card_inventory_issued_by"
                            name="bin_card_inventory[][issued_by]"
                            tabIndex="2"
                            type="text"
                            value=""
                            />
                        </td>
                        <td>
                            <input id="bin_card_inventory_edit" type="hidden" />
                            <input
                            id="bin_card_inventory_save_details"
                            type="button"
                            value="Save"
                            className="bin_card_inventory_save_details btn btn-warning"
                            tabIndex="2"
                            />
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                {/* Back Button */}
                <div className="d-flex justify-content-between">
                    {/* <%= link_to 'Back', inventories_path, class: 'btn btn-secondary' %> */}
                </div>
                </div>
            </div>
            </div>
    )
}