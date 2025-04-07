import React from "react";
import UseCurrentAgent  from "../Login/UseCurrentAgent";

export default Header = () => {
  const { agent, loading } = UseCurrentAgent();
    return(
         
      <div className="page-header row">
        {/* <!-- Page Header Start--> */}
        <div className="col-auto header-left-wrapper">
          <div className="header-logo-wrapper p-0 left-header">
            <div className="logo-wrapper">
              <a href="/">
                
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
                    {/* <svg>
                      <use href="../assets/svg/icon-sprite.svg#stroke-job-search"></use>
                    </svg> */}
                    <i className="icofont icofont-search"></i>
                  </span>
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
                
                <li className="profile-nav onhover-dropdown">
                  <div className="onhover-click">
                    <div className="sidebar-image">
                      {" "}
                      <img src="../assets/images/user.png" alt="profile" />
                      <span className="status status-success"></span>
                    </div>
                    <div className="sidebar-content">
                      <h4>Michael Medina</h4>
                      <span className="f-12 f-w-600 f-light">Junior Web and SQL Developer</span>
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
                  {loading ? (
              "Loading..."
            ) : agent ? (
              <>
                {agent?.first_name} {agent?.last_name}
              </>
            ) : (
              "Guest"
            )}
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