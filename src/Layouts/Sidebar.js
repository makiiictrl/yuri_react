import React from "react";
import { Link } from "react-router-dom";
import UseCurrentAgent from "../Login/UseCurrentAgent";

export default Sidebar = () => {
  const { agent, loading } = UseCurrentAgent();
  return (
    <div className="sidebar-wrapper" data-sidebar-layout="stroke-svg">
      <div>
        <div className="logo-wrapper">
          <Link to="/dashboard">
            <img
              className="img-fluid"
              src="../assets/images/logo/cathay-wh.png"
              alt=""
            />
          </Link>
          <div className="back-btn">
            <i className="fa fa-angle-left"></i>
          </div>
          <div className="toggle-sidebar">
            <i
              className="status_toggle middle sidebar-toggle"
              data-feather="grid"
            >
              {" "}
            </i>
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to="/dashboard">
            <img
              className="img-fluid"
              src="../assets/images/logo/cathay-wh.png"
              alt=""
              style={{ width: "30px" }}
            />
          </Link>
        </div>
        <div className="profile-section sidebar-search">
          <div className="profile-wrapper">
            <div className="active-profile">
              {" "}
              <img
                className="img-fluid"
                src="../assets/images/user.png"
                alt="user"
              />
              <div className="status bg-success"> </div>
            </div>
            <div>
              <h4>{loading ? (
              "Loading..."
            ) : agent ? (
              <>
                {agent?.first_name} {agent?.last_name}
              </>
            ) : "No Agent Available"}</h4>
              <span>Junior Web and SQL Developer</span>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <div className="input-group">
            <span className="input-group-text" id="sidebar-search">
              <svg>
                <use href="../assets/svg/icon-sprite.svg#search"></use>
              </svg>
            </span>
            <input
              className="form-control"
              type="text"
              placeholder="Quick search"
              aria-label="Username"
              aria-describedby="sidebar-search"
            />
          </div>
        </div>

        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left"></i>
          </div>
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <li className="back-btn">
                <Link to="/">
                  <img
                    className="img-fluid"
                    src="../assets/images/logo/logo-icon.png"
                    alt=""
                  />
                </Link>
                <div className="mobile-back text-end">
                  <span>Back</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </li>
              <li className="pin-title sidebar-main-title">
                <div>
                  <h6>- Pinned</h6>
                </div>
              </li>
              <li className="sidebar-main-title">
                <div>
                  <h6 className="lan-1">- Navigation</h6>
                </div>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/dashboard"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/agent_user_menus"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-task"></use>
                  </svg>
                  <span>Agent User Menus</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-charts"></use>
                  </svg>
                  <span>Marketing</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#send"></use>
                  </svg>
                  <span>Transfer Slip</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-file"></use>
                  </svg>
                  <span>Request Slip</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#profile-check"></use>
                  </svg>
                  <span>Issue Slip</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                  <span>Inventory Entry</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                  <span>Inventory Listing</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                  <span>Item Master</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="/"
                >
                  <svg className="stroke-icon">
                    <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                  <span>Packing List</span>
                </a>
              </li>
              {/* <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-widget"></use>
                      </svg><span className="lan-6">Widgets</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="general-widget.html">General</a></li>
                      <li><a href="chart-widget.html">Chart</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-layout"></use>
                      </svg><span className="lan-7">Page layout</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="box-layout.html">Boxed</a></li>
                      <li><a href="layout-rtl.html">RTL</a></li>
                      <li><a href="layout-dark.html">Dark Layout</a></li>
                      <li><a href="hide-on-scroll.html">Hide Nav Scroll</a></li>
                      <li><a href="footer-light.html">Footer Light</a></li>
                      <li><a href="footer-dark.html">Footer Dark</a></li>
                      <li><a href="footer-fixed.html">Footer Fixed</a></li>
                    </ul>
                  </li> */}
              {/* <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-8">- Apps</h6>
                    </div>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack">    </i>
                    <label className="badge badge-light-secondary">New</label><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-project"></use>
                      </svg><span>Project           </span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="projects.html">Project List</a></li>
                      <li><a href="projectcreate.html">Create new</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="file-manager.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-file"></use>
                      </svg><span>File manager</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack">         </i><a className="sidebar-link sidebar-title link-nav" href="kanban.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-board"></use>
                      </svg><span>kanban Board</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-ecommerce"></use>
                      </svg><span>Ecommerce</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="add-products.html">Add Products</a></li>
                      <li><a href="product.html">Product</a></li>
                      <li><a href="category.html">Category page</a></li>
                      <li><a href="product-page.html">Product page</a></li>
                      <li><a href="list-products.html">Product list</a></li>
                      <li><a href="payment-details.html">Payment Details</a></li>
                      <li><a href="order-history.html">Order History</a></li>
                      <li><a className="submenu-title submenu-wrapper" href="#">Invoices<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="invoice-1.html">Invoice-1</a></li>
                          <li><a href="invoice-2.html">Invoice-2</a></li>
                          <li><a href="invoice-3.html">Invoice-3</a></li>
                          <li><a href="invoice-4.html">Invoice-4</a></li>
                          <li><a href="invoice-5.html">Invoice-5</a></li>
                          <li><a href="invoice-template.html">Invoice-6</a></li>
                        </ul>
                      </li>
                      <li><a href="cart.html">Cart</a></li>
                      <li><a href="list-wish.html">Wishlist</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                      <li><a href="pricing.html">Pricing          </a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="letter-box.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-email"></use>
                      </svg><span>Letter Box</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-chat"></use>
                      </svg><span>Chats</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="private-chat.html">Private Chat</a></li>
                      <li><a href="group-chat.html">Group Chat</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-user"></use>
                      </svg><span>Users</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="user-profile.html">Users Profile</a></li>
                      <li><a href="edit-profile.html">Users Edit</a></li>
                      <li><a href="user-cards.html">Users Cards</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="bookmark.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-bookmark"></use>
                      </svg><span>Bookmarks</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="contacts.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-contact"></use>
                      </svg><span>Contacts</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="task.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-task"> </use>
                      </svg><span>Tasks</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="calendar-basic.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-calendar"></use>
                      </svg><span>Calendar</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="social-app.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-social"></use>
                      </svg><span>Social App</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="to-do.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-to-do"> </use>
                      </svg><span>To-Do</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="search.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-search"></use>
                      </svg><span>Search Result</span></a></li>
                  <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-9">- Forms & Table</h6>
                    </div>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-form"></use>
                      </svg><span>Forms</span></a>
                    <ul className="sidebar-submenu">
                      <li><a className="submenu-title submenu-wrapper" href="#">Form Controls<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="form-validation.html">Form Validation</a></li>
                          <li><a href="base-input.html">Base Inputs</a></li>
                          <li><a href="radio-checkbox-control.html">Checkbox & Radio</a></li>
                          <li><a href="input-group.html">Input Groups</a></li>
                          <li> <a href="input-mask.html">Input Mask</a></li>
                          <li><a href="megaoptions.html">Mega Options</a></li>
                        </ul>
                      </li>
                      <li><a className="submenu-title submenu-wrapper" href="#">Form Widgets<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="datepicker.html">Datepicker</a></li>
                          <li><a href="touchspin.html">Touchspin</a></li>
                          <li><a href="select2.html">Select2</a></li>
                          <li><a href="switch.html">Switch</a></li>
                          <li><a href="typeahead.html">Typeahead</a></li>
                          <li><a href="clipboard.html">Clipboard</a></li>
                        </ul>
                      </li>
                      <li><a className="submenu-title submenu-wrapper" href="#">Form layout<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="form-wizard.html">Form Wizard 1</a></li>
                          <li><a href="form-wizard-two.html">Form Wizard 2</a></li>
                          <li><a href="two-factor.html">Two Factor</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-table"></use>
                      </svg><span>Tables</span></a>
                    <ul className="sidebar-submenu">
                      <li><a className="submenu-title" href="#">Bootstrap Tables<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="bootstrap-basic-table.html">Basic Tables</a></li>
                          <li><a href="table-components.html">Table components</a></li>
                        </ul>
                      </li>
                      <li><a className="submenu-title" href="#">Data Tables<span className="sub-arrow"><i className="fa fa-angle-right"></i></span></a>
                        <ul className="nav-sub-childmenu submenu-content">
                          <li><a href="datatable-basic-init.html">Basic Init</a></li>
                          <li> <a href="datatable-advance.html">Advance Init </a></li>
                          <li><a href="datatable-API.html">API</a></li>
                          <li><a href="datatable-data-source.html">Data Sources</a></li>
                        </ul>
                      </li>
                      <li><a href="datatable-ext-autofill.html">Ex. Data Tables</a></li>
                      <li><a href="jsgrid-table.html">Js Grid Table        </a></li>
                    </ul>
                  </li>
                  <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-2">- Components</h6>
                    </div>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-ui-kits"></use>
                      </svg><span>Ui Kits</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="typography.html">Typography</a></li>
                      <li><a href="avatars.html">Avatars</a></li>
                      <li><a href="helper-classes.html">helper classes</a></li>
                      <li><a href="grid.html">Grid</a></li>
                      <li><a href="tag-pills.html">Tag & pills</a></li>
                      <li><a href="progress-bar.html">Progress</a></li>
                      <li><a href="modal.html">Modal</a></li>
                      <li><a href="alert.html">Alert</a></li>
                      <li><a href="popover.html">Popover</a></li>
                      <li><a href="tooltip.html">Tooltip</a></li>
                      <li><a href="dropdown.html">Dropdown</a></li>
                      <li><a href="according.html">Accordion</a></li>
                      <li><a href="tab-bootstrap.html">Tabs</a></li>
                      <li><a href="list.html">Lists</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-bonus-kit"></use>
                      </svg><span>Bonus Ui</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="scrollable.html">Scrollable</a></li>
                      <li><a href="tree.html">Tree view</a></li>
                      <li><a href="toasts.html">Toasts</a></li>
                      <li><a href="rating.html">Rating</a></li>
                      <li><a href="dropzone.html">dropzone</a></li>
                      <li><a href="tour.html">Tour</a></li>
                      <li><a href="sweet-alert2.html">SweetAlert2</a></li>
                      <li><a href="modal-animated.html">Animated Modal</a></li>
                      <li><a href="owl-carousel.html">Owl Carousel</a></li>
                      <li><a href="ribbons.html">Ribbons</a></li>
                      <li><a href="pagination.html">Pagination</a></li>
                      <li><a href="breadcrumb.html">Breadcrumb</a></li>
                      <li><a href="range-slider.html">Range Slider</a></li>
                      <li><a href="image-cropper.html">Image cropper</a></li>
                      <li><a href="basic-card.html">Basic Card</a></li>
                      <li><a href="creative-card.html">Creative Card</a></li>
                      <li><a href="dragable-card.html">Draggable Card</a></li>
                      <li><a href="timeline-v-1.html">Timeline </a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-animation"></use>
                      </svg><span>Animation</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="animate.html">Animate</a></li>
                      <li><a href="scroll-reval.html">Scroll Reveal</a></li>
                      <li><a href="AOS.html">AOS animation</a></li>
                      <li><a href="tilt.html">Tilt Animation</a></li>
                      <li><a href="wow.html">Wow Animation</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-icons"></use>
                      </svg><span>Icons</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="flag-icon.html">Flag icon</a></li>
                      <li><a href="font-awesome.html">Fontawesome Icon</a></li>
                      <li><a href="ico-icon.html">Ico Icon</a></li>
                      <li><a href="themify-icon.html">Themify Icon</a></li>
                      <li><a href="feather-icon.html">Feather icon</a></li>
                      <li><a href="whether-icon.html">Whether Icon</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="buttons.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-button"></use>
                      </svg><span>Buttons</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-charts"></use>
                      </svg><span>Charts</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="echarts.html">Echarts</a></li>
                      <li><a href="chart-apex.html">Apex Chart</a></li>
                      <li><a href="chart-google.html">Google Chart</a></li>
                      <li><a href="chart-sparkline.html">Sparkline chart</a></li>
                      <li><a href="chart-flot.html">Flot Chart</a></li>
                      <li><a href="chart-knob.html">Knob Chart</a></li>
                      <li><a href="chart-morris.html">Morris Chart</a></li>
                      <li><a href="chartjs.html">Chatjs Chart</a></li>
                      <li><a href="chartist.html">Chartist Chart</a></li>
                      <li><a href="chart-peity.html">Peity Chart</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-9">- Pages</h6>
                    </div>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="landing-page.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-landing-page"></use>
                      </svg><span>Landing page</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="sample-page.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-sample-page"></use>
                      </svg><span>Sample page</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="internationalization.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-internationalization"></use>
                      </svg><span>Internationalization</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="../starter-kit/index.html" target="_blank">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-starter-kit"></use>
                      </svg><span>Starter kit</span></a></li>
                  <li className="mega-menu sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-others"></use>
                      </svg><span>Others</span></a>
                    <div className="mega-menu-container menu-content">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col mega-box">
                            <div className="link-section">
                              <div className="submenu-title">
                                <h5>Error Page</h5>
                              </div>
                              <ul className="submenu-content opensubmegamenu">
                                <li><a href="error-400.html">Error 400</a></li>
                                <li><a href="error-401.html">Error 401</a></li>
                                <li><a href="error-403.html">Error 403</a></li>
                                <li><a href="error-404.html">Error 404</a></li>
                                <li><a href="error-500.html">Error 500</a></li>
                                <li><a href="error-503.html">Error 503</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col mega-box">
                            <div className="link-section">
                              <div className="submenu-title">
                                <h5> Authentication</h5>
                              </div>
                              <ul className="submenu-content opensubmegamenu">
                                <li><a href="login.html" target="_blank">Login Simple</a></li>
                                <li><a href="login_one.html" target="_blank">Visual Login</a></li>
                                <li><a href="login_two.html" target="_blank">Visual Login 2                     </a></li>
                                <li><a href="login-bs-validation.html" target="_blank">Validate Login</a></li>
                                <li><a href="login-bs-tt-validation.html" target="_blank">Tooltip Login</a></li>
                                <li><a href="login-sa-validation.html" target="_blank">Alert Login</a></li>
                                <li><a href="sign-up.html" target="_blank">Register</a></li>
                                <li><a href="sign-up-one.html" target="_blank">Register Image                              </a></li>
                                <li><a href="sign-up-two.html" target="_blank">Visual Reg 2</a></li>
                                <li><a href="sign-up-wizard.html" target="_blank">Reg Wizard</a></li>
                                <li><a href="unlock.html">Unlock User</a></li>
                                <li><a href="forget-password.html">Pwd Forget</a></li>
                                <li><a href="reset-password.html">Pwd Reset</a></li>
                                <li><a href="maintenance.html">Maintenance</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col mega-box">
                            <div className="link-section">
                              <div className="submenu-title">
                                <h5>Coming Soon</h5>
                              </div>
                              <ul className="submenu-content opensubmegamenu">
                                <li><a href="comingsoon.html">Coming Simple</a></li>
                                <li><a href="comingsoon-bg-video.html">Coming Bg Vid</a></li>
                                <li><a href="comingsoon-bg-img.html">Coming Bg Img</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col mega-box">
                            <div className="link-section">
                              <div className="submenu-title">
                                <h5>Email templates</h5>
                              </div>
                              <ul className="submenu-content opensubmegamenu">
                                <li><a href="basic-template.html">Basic Email</a></li>
                                <li><a href="email-header.html">Basic Header</a></li>
                                <li><a href="template-email.html">Ecom Temp</a></li>
                                <li><a href="template-email-2.html">Ecom Temp2</a></li>
                                <li><a href="ecommerce-templates.html">Ecom Email</a></li>
                                <li><a href="email-order-success.html">Order Success</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-10">- Miscellaneous</h6>
                    </div>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-gallery"></use>
                      </svg><span>Gallery</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="gallery.html">Gallery Grid</a></li>
                      <li><a href="gallery-with-description.html">Gallery Grid Desc</a></li>
                      <li><a href="gallery-masonry.html">Masonry Gallery</a></li>
                      <li><a href="masonry-gallery-with-disc.html">Masonry with Desc</a></li>
                      <li><a href="gallery-hover.html">Hover Effects</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-blog"></use>
                      </svg><span>Blog</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="blog.html">Blog Details</a></li>
                      <li><a href="blog-single.html">Blog Single</a></li>
                      <li><a href="add-post.html">Add Post</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="faq.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-faq"></use>
                      </svg><span>FAQ</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-job-search"></use>
                      </svg><span>Job Search</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="job-cards-view.html">Cards view</a></li>
                      <li><a href="job-list-view.html">List View</a></li>
                      <li><a href="job-details.html">Job Details</a></li>
                      <li><a href="job-apply.html">Apply</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-learning"></use>
                      </svg><span>Learning</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="learning-list-view.html">Learning List</a></li>
                      <li><a href="learning-detailed.html">Detailed Course</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-maps"></use>
                      </svg><span>Maps</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="map-js.html">Maps JS</a></li>
                      <li><a href="vector-map.html">Vector Maps</a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title" href="#">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-editors"></use>
                      </svg><span>Editors</span></a>
                    <ul className="sidebar-submenu">
                      <li><a href="quilleditor.html">Quill editor</a></li>
                      <li><a href="ace-code-editor.html">ACE code editor </a></li>
                    </ul>
                  </li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="knowledgebase.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-knowledgebase"></use>
                      </svg><span>Knowledgebase</span></a></li>
                  <li className="sidebar-list"><i className="fa fa-thumb-tack"></i><a className="sidebar-link sidebar-title link-nav" href="support-ticket.html">
                      <svg className="stroke-icon">
                        <use href="../assets/svg/icon-sprite.svg#stroke-support-tickets"></use>
                      </svg><span>Support Ticket</span></a></li> */}
            </ul>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
          </div>
        </nav>
      </div>
    </div>
  );
};
