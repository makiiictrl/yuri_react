import React from "react";

export default Header = () => {
    return(
        
      <div className="page-header row">
        {/* <!-- Page Header Start--> */}
        <div className="col-auto header-left-wrapper">
          <div className="header-logo-wrapper p-0 left-header">
            <div className="logo-wrapper">
              <a href="/">
                <img
                  className="img-fluid"
                  src=""
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="toggle-sidebar">
            <svg className="status_toggle sidebar-toggle">
              <use href="../assets/svg/icon-sprite.svg#collapse-sidebar"></use>
            </svg>
          </div>
        </div>
        <div className="col-auto header-right-wrapper page-title">
          <div>
            <h2>Default</h2>
            <nav>
              <ol className="breadcrumb justify-content-sm-start align-items-center mb-0">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item f-w-500">Dashboard</li>
                <li className="breadcrumb-item f-w-500 active">Default</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col header-wrapper m-0 header-right-wrapper">
          <div className="row m-0">
            <form
              className="form-inline search-full col"
              action="#"
              method="get"
            >
              <div className="form-group w-100">
                <div className="Typeahead Typeahead--twitterUsers">
                  <div className="u-posRelative">
                    <input
                      className="demo-input Typeahead-input form-control-plaintext w-100"
                      type="text"
                      placeholder="Search anything .."
                      name="q"
                      title=""
                      autoFocus
                    />
                    <div
                      className="spinner-border Typeahead-spinner"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <i className="close-search" data-feather="x"></i>
                  </div>
                  <div className="Typeahead-menu"></div>
                </div>
              </div>
            </form>
            <div className="header-logo-wrapper col-auto p-0 left-header"></div>
            <div className="nav-right col-auto pull-right right-header p-0 ms-auto">
              <ul className="nav-menus">
                <li>
                  {" "}
                  <span className="header-search">
                    <svg>
                      <use href="../assets/svg/icon-sprite.svg#search"></use>
                    </svg>
                  </span>
                </li>
                <li className="onhover-dropdown">
                  <div className="notification-box onhover-click">
                    <svg>
                      <use href="../assets/svg/icon-sprite.svg#notification"></use>
                    </svg>
                    <span className="badge rounded-pill badge-success">3 </span>
                  </div>
                  <div className="onhover-show-div notification-dropdown">
                    <h6 className="f-18 mb-0 dropdown-title">Notifications </h6>
                    <ul>
                      <li className="d-flex">
                        <div className="notification-image">
                          {" "}
                          <img
                            className="img-fluid"
                            src="../assets/images/avtar/3.jpg"
                            alt="user"
                          />
                          <div className="notification-icon bg-danger">
                            <i className="fa fa-heart"></i>
                          </div>
                        </div>
                        <div>
                          <p>
                            <span className="f-w-500 me-1">Emay Walter </span>
                            liked your post{" "}
                          </p>
                          <span className="f-light">10 minutes ago</span>
                        </div>
                      </li>
                      <li className="d-flex">
                        <div className="notification-image">
                          {" "}
                          <img
                            className="img-fluid"
                            src="../assets/images/avtar/4.jpg"
                            alt="user"
                          />
                          <div className="notification-icon bg-info">
                            <i className="fa fa-share-alt"></i>
                          </div>
                        </div>
                        <div>
                          <p>
                            <span className="f-w-500 me-1">Allie Grater</span>
                            shared your post{" "}
                          </p>
                          <span className="f-light">5 hours ago</span>
                        </div>
                      </li>
                      <li className="d-flex">
                        <div className="notification-image">
                          {" "}
                          <img
                            className="img-fluid"
                            src="../assets/images/avtar/7.jpg"
                            alt="user"
                          />
                          <div className="notification-icon bg-success">
                            <i className="fa fa-wechat"></i>
                          </div>
                        </div>
                        <div>
                          <p>
                            <span className="f-w-500 me-1">Colin Sik</span>
                            commented on your post
                          </p>
                          <span className="f-light">yesterday</span>
                        </div>
                      </li>
                      <li>
                        <a className="f-w-700" href="#!">
                          Check all
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="cart-nav onhover-dropdown">
                  <div className="cart-box onhover-click">
                    <svg>
                      <use href="../assets/svg/icon-sprite.svg#email"></use>
                    </svg>
                    <span className="badge rounded-pill badge-danger">2</span>
                  </div>
                  <div className="onhover-show-div chat-dropdown">
                    <div className="dropdown-title">
                      <div className="d-flex align-items-center">
                        {" "}
                        <img
                          className="img-fluid img-40 rounded-circle"
                          src="../assets/images/dashboard/user/1.jpg"
                          alt="user"
                        />
                        <div>
                          <h6 className="f-18 mb-0">Jane Cooper</h6>
                          <p className="mb-0">
                            {" "}
                            <span className="status status-success me-1"></span>
                            <span>active</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li className="send-msg">
                        <div>
                          {" "}
                          <img
                            className="img-fluid img-30 rounded-circle"
                            src="../assets/images/dashboard/user/1.jpg"
                            alt="user"
                          />
                          <div>
                            <p>Hello.how are you?</p>
                          </div>
                        </div>
                      </li>
                      <li className="reply-msg">
                        <div>
                          {" "}
                          <img
                            className="img-fluid img-30 rounded-circle"
                            src="../assets/images/dashboard/user/3.jpg"
                            alt="user"
                          />
                          <div>
                            <p>Hi, i'm fine.what about you?</p>
                          </div>
                        </div>
                      </li>
                      <li className="send-msg">
                        <div>
                          {" "}
                          <img
                            className="img-fluid img-30 rounded-circle"
                            src="../assets/images/dashboard/user/1.jpg"
                            alt="user"
                          />
                          <div>
                            <p>I am facing js issue can you help me?</p>
                          </div>
                        </div>
                      </li>
                      <li className="reply-msg">
                        <div>
                          {" "}
                          <img
                            className="img-fluid img-30 rounded-circle"
                            src="../assets/images/dashboard/user/3.jpg"
                            alt="user"
                          />
                          <div>
                            <p>Sure, i will help you.</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="chat-input">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Type message here..."
                        />
                        <span className="input-group-text bg-primary">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#send"></use>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mode">
                    <svg className="moon-icon">
                      <use href="../assets/svg/icon-sprite.svg#moon"></use>
                    </svg>
                    <svg className="sun-icon">
                      <use href="../assets/svg/icon-sprite.svg#sun"></use>
                    </svg>
                  </div>
                </li>
                <li className="cart-nav onhover-dropdown">
                  <div className="cart-box onhover-click">
                    <svg>
                      <use href="../assets/svg/icon-sprite.svg#stroke-ecommerce"></use>
                    </svg>
                    <span className="badge rounded-pill badge-primary">2</span>
                  </div>
                  <div className="cart-dropdown onhover-show-div">
                    <h6 className="f-18 mb-0 dropdown-title">Cart</h6>
                    <ul className="cart-main-wrapper">
                      <li className="cart-product">
                        <div className="d-flex">
                          <img
                            className="img-fluid b-r-5 me-3 img-60"
                            src="../assets/images/other-images/cart-img2.jpg"
                            alt="cosmetic"
                          />
                          <div className="flex-grow-1">
                            <span className="f-w-500">Beauty cosmetic</span>
                            <div className="qty-box">
                              <div className="touchspin-wrapper">
                                <button className="decrement-touchspin btn-touchspin">
                                  <i className="fa fa-minus text-gray"></i>
                                </button>
                                {/* <input className="input-touchspin" id="inputData" type="number" value="2"/> */}
                                <button className="increment-touchspin btn-touchspin">
                                  <i className="fa fa-plus text-gray"></i>
                                </button>
                              </div>
                              <h6 className="font-primary">$20 </h6>
                            </div>
                          </div>
                          <div className="close-circle">
                            <a href="#">
                              <i data-feather="trash-2"></i>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="cart-product">
                        <div className="d-flex">
                          <img
                            className="img-fluid b-r-5 me-3 img-60"
                            src="../assets/images/other-images/cart-img-1.jpg"
                            alt="shoes"
                          />
                          <div className="flex-grow-1">
                            <span className="f-w-500">Simple shoes</span>
                            <div className="qty-box">
                              <div className="touchspin-wrapper">
                                <button className="decrement-touchspin btn-touchspin">
                                  <i className="fa fa-minus text-gray"></i>
                                </button>
                                {/* <input className="input-touchspin" id="inputData1" type="number" value="1"/> */}
                                <button className="increment-touchspin btn-touchspin">
                                  <i className="fa fa-plus text-gray"></i>
                                </button>
                              </div>
                              <h6 className="font-primary">$30 </h6>
                            </div>
                          </div>
                          <div className="close-circle">
                            <a href="#">
                              <i data-feather="trash-2"></i>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="total">
                        <h6 className="mb-0">
                          Order Total : <span className="f-right">$70.00</span>
                        </h6>
                      </li>
                      <li className="text-center">
                        <a
                          className="d-block mb-3 view-cart f-w-700"
                          href="cart.html"
                        >
                          Go to your cart
                        </a>
                        <a
                          className="btn btn-primary view-checkout w-100"
                          href="checkout.html"
                        >
                          Checkout
                        </a>
                      </li>
                    </ul>
                    <div className="cart-empty">
                      <div className="cart-image">
                        {" "}
                        <img
                          className="img-fluid"
                          src="../assets/images/product/order-trash.gif"
                          alt="empty"
                        />
                      </div>
                      <h5>Oops! Your cart empty!!!</h5>
                    </div>
                  </div>
                </li>
                <li className="profile-nav onhover-dropdown">
                  <div className="onhover-click">
                    <div className="sidebar-image">
                      {" "}
                      <img src="../assets/images/user.png" alt="profile" />
                      <span className="status status-success"></span>
                    </div>
                    <div className="sidebar-content">
                      <h4>Wade Warren</h4>
                      <span className="f-12 f-w-600 f-light">UI Designer</span>
                    </div>
                  </div>
                  <ul className="profile-dropdown onhover-show-div">
                    <li>
                      <a href="sign-up.html">
                        <div className="profile-icon">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#user"></use>
                          </svg>
                        </div>
                        <span>Account </span>
                      </a>
                    </li>
                    <li>
                      <a href="letter-box.html">
                        <div className="profile-icon">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#stroke-email"></use>
                          </svg>
                        </div>
                        <span>Inbox</span>
                      </a>
                    </li>
                    <li>
                      <a href="task.html">
                        <div className="profile-icon">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#notepad"></use>
                          </svg>
                        </div>
                        <span>Taskboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="edit-profile.html">
                        <div className="profile-icon">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#settings"></use>
                          </svg>
                        </div>
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="login.html">
                        <div className="profile-icon">
                          <svg>
                            <use href="../assets/svg/icon-sprite.svg#login"></use>
                          </svg>
                        </div>
                        <span>Log out</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <script
              className="result-template"
              type="text/x-handlebars-template"
            >
              <div className="ProfileCard u-cf">
                <div className="ProfileCard-avatar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-airplay m-0"
                  >
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <polygon points="12 15 17 21 7 21 12 15"></polygon>
                  </svg>
                </div>
                <div className="ProfileCard-details">
                  <div className="ProfileCard-realName">
                    Michael Angelo Medina
                  </div>
                </div>
              </div>
            </script>
            <script
              className="empty-template"
              type="text/x-handlebars-template"
            >
              <div className="EmptyMessage">
                Your search turned up 0 results. This most likely means the
                backend is down, yikes!
              </div>
            </script>
          </div>
        </div>
        {/* <!-- Page Header Ends--> */}
      </div>
    )
}