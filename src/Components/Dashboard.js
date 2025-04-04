import React from "react";

export default Dashboard = () => {
    return(
        <div className="page-body">
          {/* <!-- Container-fluid starts--> */}
          <div className="container-fluid default-dashboard">
            <div className="row size-column">
              <div className="col-xl-9 col-xl-100 box-col-12">
                <div className="row"> 
                  <div className="col-xl-6 box-col-6">
                    <div className="card title-line upgrade-card overflow-hidden">
                      <div className="row align-items-end"> 
                        <div className="col-sm-8 col-11"> 
                          <div className="card-header"> 
                            <h2>Hi, Welcome back <span className="txt-primary">Wade! </span></h2>
                            <p className="mt-2 f-light">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </p><a className="btn btn-primary btn-hover-effect btn-sm f-w-500" href="pricing.html">Upgrade Plan
                              <svg className="svg-sprite">
                                <use href="../assets/svg/icon-sprite.svg#logout"> </use>
                              </svg></a>
                          </div>
                        </div>
                      </div>
                      <div className="cartoon-image"> <img className="img-fluid" src="../assets/images/dashboard/welcome.png" alt="vector"/></div><img className="img-fluid pattern-image" src="../assets/images/dashboard/bg-1.png" alt="vector pattern"/>
                    </div>
                  </div>
                  <div className="col-xl-6 box-col-6">
                    <div className="row tread-cards">
                      <div className="col-xl-6 col-sm-6"> 
                        <div className="card widget-1">
                          <div className="card-body common-box">
                            <div className="widget-icon primary widget-round">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#crown"> </use>
                              </svg>
                            </div>
                            <div> 
                              <h3 className="f-w-600">User Profile</h3><span className="f-w-500 f-light f-12">Consectetur adipiscing </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6"> 
                        <div className="card widget-1">
                          <div className="card-body common-box">
                            <div className="widget-icon success widget-round">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#flash"> </use>
                              </svg>
                            </div>
                            <div> 
                              <h3 className="f-w-600">Latest Trends</h3><span className="f-w-500 f-light f-12">Minim veniam</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6"> 
                        <div className="card widget-1"> 
                          <div className="card-body common-box">
                            <div className="widget-icon warning widget-round">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#blend-2"> </use>
                              </svg>
                            </div>
                            <div> 
                              <h3 className="f-w-600">New Arrivals</h3><span className="f-w-500 f-light f-12">Excepteur sint</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6"> 
                        <div className="card widget-1">
                          <div className="card-body common-box">
                            <div className="widget-icon secondary widget-round">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#color-filter"> </use>
                              </svg>
                            </div>
                            <div> 
                              <h3 className="f-w-600">Best Referrals</h3><span className="f-w-500 f-light f-12">Quis nostrud exercitation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="row small-charts">
                      <div className="col-xl-6 col-sm-6"> 
                        <div className="card title-line widget-1">
                          <div className="card-header card-no-border"> 
                            <h2>Revenue</h2><span className="f-w-500 f-12 f-light mt-0">Today Revenue <span className="txt-primary">30% OFF</span></span>
                          </div>
                          <div className="card-body pt-0">
                            <div className="revenue-chart-container"> 
                              <div id="revenue-chart"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6">
                        <div className="card title-line widget-1 sales-pipeline">
                          <div className="card-header card-no-border">
                            <h2>Sales Pipeline</h2><span className="f-w-500 f-12 f-light mt-0">Special Discount <span className="txt-primary">60% OFF</span></span>
                          </div>
                          <div className="card-body pt-0">
                            <div className="pipeline-chart-container"> 
                              <div id="pipeline-chart"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6 rate-column"> 
                        <div className="card title-line widget-1">
                          <div className="card-header card-no-border"> 
                            <h2>Satisfaction Rate</h2>
                          </div>
                          <div className="card-body pt-0">
                            <div className="light-card satisfaction-box common-box">
                              <div className="widget-icon primary widget-round">
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#like-shape"></use>
                                </svg>
                              </div>
                              <div> 
                                <h2>89,786(82%)</h2><span className="f-light f-w-500 f-12">Vote by Consumer</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-6 revenue-column col-xxl-100 box-col-12">
                        <div className="card title-line widget-1">
                          <div className="card-header card-no-border"> 
                            <h2>Revenue by Industry</h2>
                          </div>
                          <div className="card-body pt-0">
                            <div className="revenue-slider-wrapper"> 
                              <div className="swiper revenue-swiper">
                                <div className="swiper-wrapper">
                                  <div className="swiper-slide"> 
                                    <div className="light-card satisfaction-box progrees-widget">
                                      <div className="d-flex justify-content-between align-items-center"><span className="social-content"><i className="txt-primary fa fa-facebook-square me-1"></i><span className="f-w-500 f-light">Facebook</span></span><span className="f-12 f-w-500 f-light">45%</span></div>
                                      <div className="progress progress-stripe-primary with-light-background mt-2" style={{height: "5px"}}>
                                        <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "45%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="swiper-slide"> 
                                    <div className="light-card satisfaction-box progrees-widget">
                                      <div className="d-flex justify-content-between align-items-center"><span className="social-content"><i className="txt-secondary fa fa-instagram me-1"></i><span className="f-w-500 f-light">Instagram</span></span><span className="f-12 f-w-500 f-light">70%</span></div>
                                      <div className="progress progress-stripe-secondary with-light-background mt-2" style={{height: "5px"}}>
                                        <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "70%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="swiper-slide"> 
                                    <div className="light-card satisfaction-box progrees-widget">
                                      <div className="d-flex justify-content-between align-items-center"><span className="social-content"><i className="txt-success fa fa-twitter me-1"></i><span className="f-w-500 f-light">Twitter </span></span><span className="f-12 f-w-500 f-light">30%</span></div>
                                      <div className="progress progress-stripe-success with-light-background mt-2" style={{height: "5px"}}>
                                        <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "30%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="swiper-pagination"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="card height-equal title-line">
                      <div className="card-header card-no-border">
                        <div className="header-top">
                          <h2>Total Profit<span className="f-light f-12 d-block f-w-500">Special Discount <span className="txt-primary">60% OFF</span></span></h2>
                          <div className="card-header-right-icon">
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" id="overviewButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">Weekly</button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="overviewButton"><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">weekly</a><a className="dropdown-item" href="#">yearly</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pt-0"> 
                        <div className="profit-data"> 
                          <h2>$15,087<span className="f-light f-w-500 f-12">(Another <span className="txt-primary me-1">$35,098  </span>to Goal) </span></h2>
                        </div>
                        <div className="profit-chart-container"> 
                          <div id="profit_chart"> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"> 
                    <div className="card title-line">
                      <div className="card-header card-no-border">
                        <div className="header-top">
                          <div> 
                            <h2>Earning Reports<span className="d-block f-w-500 f-light f-12">Weekly Earning Overview</span></h2>
                          </div>
                          <div className="card-header-right-icon">
                            <div className="dropdown icon-dropdown">
                              <button className="btn dropdown-toggle" id="earning-avg" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                </svg>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="earning-avg"><a className="dropdown-item" href="#">Today</a><a className="dropdown-item" href="#">Tomorrow</a><a className="dropdown-item" href="#">Yesterday</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <div className="report-chart-container"> 
                          <div id="earning-chart"> </div>
                        </div>
                        <ul className="report-list"> 
                          <li> 
                            <div className="light-card report-icon"> 
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#status-up"></use>
                              </svg>
                            </div>
                            <div> <span className="f-12 f-w-500 f-light">Profit</span>
                              <h4 className="mt-1 f-w-600">$98.50<span className="badge badge-light-primary ms-1"><i className="me-1" data-feather="trending-up"></i>13.5%</span></h4>
                            </div>
                          </li>
                          <li> 
                            <div className="light-card report-icon"> 
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#expense"></use>
                              </svg>
                            </div>
                            <div> <span className="f-12 f-w-500 f-light">Expense</span>
                              <h4 className="mt-1 f-w-600">$109.90<span className="badge badge-light-warning ms-1"><i className="me-1" data-feather="trending-down"></i>1.05%</span></h4>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 order-md-i">
                    <div className="card title-line">
                      <div className="card-header card-no-border transaction-header">
                        <div className="header-top">
                          <h2>Upcoming Transaction<span className="f-light f-12 d-block f-w-500">Special Discount <span className="txt-primary">60% OFF</span></span></h2>
                          <div className="card-header-right-icon">
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" id="overviewButton1" type="button" data-bs-toggle="dropdown" aria-expanded="false">Weekly</button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="overviewButton1"><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">weekly</a><a className="dropdown-item" href="#">yearly</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pt-0 transaction-list">
                        <ul> 
                          <li className="transaction-title"> <span className="f-w-500 f-light f-12">Today</span></li>
                          <li> 
                            <div className="transaction-content"> 
                              <div className="transaction-icon bg-light-primary"> 
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#bill"></use>
                                </svg>
                              </div>
                              <div className="transaction-right-content"> 
                                <div> <a href="list-wish.html"> 
                                    <h6>Water Bill</h6></a><span className="f-light f-w-400">Unsuccessfully</span></div><span className="txt-danger f-w-500">-$120</span>
                              </div>
                            </div>
                          </li>
                          <li className="transaction-title"> <span className="f-w-500 f-light f-12">Tomorrow</span></li>
                          <li> 
                            <div className="transaction-content"> 
                              <div className="transaction-icon bg-light-success"> 
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#payment"></use>
                                </svg>
                              </div>
                              <div className="transaction-right-content"> 
                                <div> <a href="list-wish.html">
                                    <h6>Income : Salary Oct</h6></a><span className="f-light f-w-400">Successfully</span></div><span className="f-w-500">+$1200</span>
                              </div>
                            </div>
                          </li>
                          <li> 
                            <div className="transaction-content"> 
                              <div className="transaction-icon bg-light-warning">
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#invoice"></use>
                                </svg>
                              </div>
                              <div className="transaction-right-content"> 
                                <div> <a href="list-wish.html">
                                    <h6>Electric Bill</h6></a><span className="f-light f-w-400">Successfully</span></div><span className="f-w-500 txt-danger">-$191</span>
                              </div>
                            </div>
                          </li>
                          <li> 
                            <div className="transaction-content"> 
                              <div className="transaction-icon bg-light-secondary">
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#transfer"></use>
                                </svg>
                              </div>
                              <div className="transaction-right-content pb-0">
                                <div> <a href="list-wish.html">
                                    <h6>Income : Jane transfers</h6></a><span className="f-light f-w-400">Successfully</span></div><span className="f-w-500">+$540</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 order-md-iii">
                    <div className="card title-line overflow-hidden member-wrapper">
                      <div className="card-header card-no-border">
                        <div className="header-top">
                          <h2>Members Statistics<span className="f-12 f-w-500 f-light d-block">Over 10k members</span></h2>
                          <div className="card-header-right-icon"><a className="link-with-icon" href="#!">+ Add New Member</a></div>
                        </div>
                      </div>
                      <div className="ard-body member-datatable p-0"> 
                        <table className="table" id="member-table">
                          <thead> 
                            <tr> 
                              <th></th>
                              <th> <span className="f-light f-w-600">Authors</span></th>
                              <th> <span className="f-light f-w-600">Company</span></th>
                              <th> <span className="f-light f-w-600">Progress</span></th>
                              <th> <span className="f-light f-w-600">Action</span></th>
                            </tr>
                          </thead>
                          <tbody> 
                            <tr> 
                              <td> 
                                <div className="checkbox-checked">
                                  <div className="form-check">
                                    <input className="form-check-input" id="checkbox-2" type="checkbox" value=""/>
                                  </div>
                                </div>
                              </td>
                              <td> 
                                <div className="d-flex gap-2"> <img src="../assets/images/dashboard/user/2.jpg" alt="user"/>
                                  <div><a href="user-profile.html"> 
                                      <h6 className="f-w-500">Jerome Bell</h6></a><span className="f-light f-12 f-w-500">UX designer</span></div>
                                </div>
                              </td>
                              <td> <a href="user-profile.html">
                                  <h6 className="f-w-500">Louis</h6></a><span className="f-light f-12 f-w-500">UX designer</span></td>
                              <td> <span className="f-w-500 f-12 f-light">70%</span>
                                <div className="progress progress-stripe-primary mt-2" style={{height: "5px"}}>
                                  <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "70%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex action-buttons"><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#edit-2"></use>
                                    </svg></a><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#trash-fill"></use>
                                    </svg></a></div>
                              </td>
                            </tr>
                            <tr> 
                              <td> 
                                <div className="checkbox-checked">
                                  <div className="form-check">
                                    <input className="form-check-input" id="checkbox-3" type="checkbox" value=""/>
                                  </div>
                                </div>
                              </td>
                              <td> 
                                <div className="d-flex gap-2"> <img src="../assets/images/dashboard/user/4.jpg" alt="user"/>
                                  <div> <a href="user-profile.html">
                                      <h6 className="f-w-500">Ralph Edwa</h6></a><span className="f-light f-12 f-w-500">Web, Laravel</span></div>
                                </div>
                              </td>
                              <td> <a href="user-profile.html">
                                  <h6 className="f-w-500">IBM</h6></a><span className="f-light f-12 f-w-500">Development</span></td>
                              <td> <span className="f-w-500 f-12 f-light">50%</span>
                                <div className="progress progress-stripe-success mt-2" style={{height: "5px"}}>
                                  <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex action-buttons"><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#edit-2"></use>
                                    </svg></a><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#trash-fill"></use>
                                    </svg></a></div>
                              </td>
                            </tr>
                            <tr> 
                              <td> 
                                <div className="checkbox-checked">
                                  <div className="form-check">
                                    <input className="form-check-input" id="checkbox-4" type="checkbox" value=""/>
                                  </div>
                                </div>
                              </td>
                              <td> 
                                <div className="d-flex gap-2"> <img src="../assets/images/dashboard/user/5.jpg" alt="user"/>
                                  <div> <a href="user-profile.html">
                                      <h6 className="f-w-500">Esther Kit</h6></a><span className="f-light f-12 f-w-500">Laravel</span></div>
                                </div>
                              </td>
                              <td> <a href="user-profile.html">
                                  <h6 className="f-w-500">Johnson</h6></a><span className="f-light f-12 f-w-500">Unity Game</span></td>
                              <td> <span className="f-w-500 f-12 f-light">83%</span>
                                <div className="progress progress-stripe-secondary mt-2" style={{height: "5px"}}>
                                  <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "83%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex action-buttons"><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#edit-2"></use>
                                    </svg></a><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#trash-fill"></use>
                                    </svg></a></div>
                              </td>
                            </tr>
                            <tr> 
                              <td> 
                                <div className="checkbox-checked">
                                  <div className="form-check">
                                    <input className="form-check-input" id="checkbox-5" type="checkbox" value=""/>
                                  </div>
                                </div>
                              </td>
                              <td> 
                                <div className="d-flex gap-2"> <img src="../assets/images/dashboard/user/1.png" alt="user"/>
                                  <div> <a href="user-profile.html">
                                      <h6 className="f-w-500">Leslie Jolly</h6></a><span className="f-light f-12 f-w-500">Designer</span></div>
                                </div>
                              </td>
                              <td> <a href="user-profile.html">
                                  <h6 className="f-w-500">Card</h6></a><span className="f-light f-12 f-w-500">Marketing </span></td>
                              <td> <span className="f-w-500 f-12 f-light">79%</span>
                                <div className="progress progress-stripe-warning mt-2" style={{height: "5px"}}>
                                  <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "79%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex action-buttons"><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#edit-2"></use>
                                    </svg></a><a className="light-card" href="#!"> 
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#trash-fill"></use>
                                    </svg></a></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 order-md-ii">
                    <div className="card title-line">
                      <div className="card-header card-no-border report-option">
                        <div className="header-top">
                          <h2>Top Referrals Pages<span className="f-light f-12 d-block f-w-500">Up to $100 per referral</span></h2>
                          <div className="card-header-right-icon">
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" id="referralButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">Generate Report</button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="referralButton"><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">weekly</a><a className="dropdown-item" href="#">yearly</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pt-0"> 
                        <div className="referral-content"> 
                          <div className="referral-left-details"> 
                            <div className="d-flex gap-1"> 
                              <h2>129,900</h2><span className="badge badge-light-warning"> <i className="me-1" data-feather="trending-up"></i>4.5%</span>
                            </div><span className="f-light f-12 f-w-500">vs. previous month</span>
                          </div>
                          <div className="referral-image"> <img src="../assets/images/dashboard/1.png" alt="vector"/></div>
                        </div>
                        <div className="progress-stacked referral-progress">
                          <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "30%"}}>
                            <div className="progress-bar bg-primary"></div>
                          </div>
                          <div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
                            <div className="progress-bar bg-success"></div>
                          </div>
                          <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{width: "15%"}}>
                            <div className="progress-bar bg-warning"></div>
                          </div>
                          <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{width: "15%"}}>
                            <div className="progress-bar bg-secondary"></div>
                          </div>
                          <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
                            <div className="progress-bar bg-info"></div>
                          </div>
                        </div>
                        <ul className="referral-list">
                          <li> 
                            <div className="activity-dot-primary"></div><a className="f-light f-w-500" href="search.html">www.google.com</a><span className="f-12 f-w-500">35.89%</span>
                          </li>
                          <li> 
                            <div className="activity-dot-success"></div><a className="f-light f-w-500" href="search.html">www.youtube.com</a><span className="f-12 f-w-500">19.12%</span>
                          </li>
                          <li> 
                            <div className="activity-dot-warning"></div><a className="f-light f-w-500" href="search.html">www.media.com</a><span className="f-12 f-w-500">14.75%</span>
                          </li>
                          <li> 
                            <div className="activity-dot-secondary"></div><a className="f-light f-w-500" href="search.html">www.pixelstrap.com</a><span className="f-12 f-w-500">19.76%</span>
                          </li>
                          <li> 
                            <div className="activity-dot-secondary"></div><a className="f-light f-w-500" href="search.html">www.facebook.com</a><span className="f-12 f-w-500">18.98%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-xl-100">
                <div className="card">
                  <div className="row">
                    <div className="col-xl-12 col-xl-40 col-sm-6 order-xl-ii discount-report">
                      <div className="card-header card-no-border">
                        <div className="header-top">
                          <div> 
                            <h2>Total Transactions<span className="d-block f-w-500 f-light f-12">Special Discount <span className="txt-primary">60% OFF</span></span></h2>
                          </div>
                          <div className="card-header-right-icon">
                            <div className="dropdown icon-dropdown">
                              <button className="btn dropdown-toggle" id="earning-avg1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg>
                                  <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                </svg>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="earning-avg1"><a className="dropdown-item" href="#">Today</a><a className="dropdown-item" href="#">Tomorrow</a><a className="dropdown-item" href="#">Yesterday</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body transaction-report">
                        <div className="total-transaction-wrapper"> 
                          <div id="total-transaction-chart"></div>
                        </div>
                        <div className="report-content">
                          <h5>Report</h5>
                          <ul> 
                            <li> <span className="f-12 f-light f-w-500">This Week</span>
                              <h6>+78.32 %</h6>
                              <div className="progress progress-stripe-primary with-light-background" style={{height: "5px"}}>
                                <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "70%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </li>
                            <li> <span className="f-12 f-light f-w-500">This Week</span>
                              <h6>-34.52 %</h6>
                              <div className="progress progress-stripe-success with-light-background" style={{height: "5px"}}>
                                <div className="progress-bar-animated progress-bar-striped" role="progressbar" style={{width: "70%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="report-button"> 
                          <div> 
                            <h5 className="f-w-600">+95.62 % <span className="f-light f-12 f-w-500">Performance</span></h5>
                          </div><a className="btn btn-primary f-w-500 f-12" href="#!">New report 
                            <svg className="svg-sprite">
                              <use href="../assets/svg/icon-sprite.svg#logout"></use>
                            </svg></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-xl-30 col-sm-6 order-xl-ii customer-order">
                      <div className="card-header card-no-border">
                        <div className="header-top order-lists">
                          <div> 
                            <h2>Recent Orders<span className="d-block f-w-500 f-light f-12">80 Orders in a December</span></h2>
                          </div>
                          <div className="card-header-right-icon">
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" id="recent-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">All Orders</button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="recent-button"><a className="dropdown-item" href="#">Pending</a><a className="dropdown-item" href="#">Success</a><a className="dropdown-item" href="#">Deliver</a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body transaction-list recent-orders">
                        <ul className="order-list mb-0">
                          <li>
                            <div className="light-card"> <img src="../assets/images/dashboard/product/1.png" alt="TV"/></div>
                            <div className="order-content">
                              <div><a href="order-history.html"> 
                                  <h6 className="mb-1"> Apple PC</h6></a><span> <span className="badge badge-light-primary">#10988</span><span className="f-light f-w-500 f-12 ms-2">3 Item</span></span></div>
                              <div className="text-end"> 
                                <div className="dropdown icon-dropdown">
                                  <button className="btn dropdown-toggle" id="order-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="order-1"><a className="dropdown-item" href="cart.html">Add to cart</a><a className="dropdown-item" href="#">Cancel</a></div>
                                </div><span className="f-light f-w-500 f-12">$5,098</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="light-card"> <img src="../assets/images/dashboard/product/2.png" alt="T-shirt"/></div>
                            <div className="order-content">
                              <div> <a href="order-history.html">
                                  <h6 className="mb-1">T-Shirts</h6></a><span> <span className="badge badge-light-primary">#10980</span><span className="f-light f-w-500 f-12 ms-2">2 Item</span></span></div>
                              <div className="text-end"> 
                                <div className="dropdown icon-dropdown">
                                  <button className="btn dropdown-toggle" id="order-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="order-2"><a className="dropdown-item" href="cart.html">Add to cart</a><a className="dropdown-item" href="#">Cancel</a></div>
                                </div><span className="f-light f-w-500 f-12">$6,010</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="light-card"> <img src="../assets/images/dashboard/product/3.png" alt="Macbook air M2"/></div>
                            <div className="order-content">
                              <div> <a href="order-history.html">
                                  <h6 className="mb-1">Macbook</h6></a><span> <span className="badge badge-light-primary">#101098</span><span className="f-light f-w-500 f-12 ms-2">5 Item</span></span></div>
                              <div className="text-end"> 
                                <div className="dropdown icon-dropdown">
                                  <button className="btn dropdown-toggle" id="order-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="order-3"><a className="dropdown-item" href="cart.html">Add to cart</a><a className="dropdown-item" href="#">Cancel</a></div>
                                </div><span className="f-light f-w-500 f-12">$12,000</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="light-card"> <img src="../assets/images/dashboard/product/4.png" alt="Shoes"/></div>
                            <div className="order-content">
                              <div> <a href="order-history.html">
                                  <h6 className="mb-1">Shoes</h6></a><span> <span className="badge badge-light-primary">#101098</span><span className="f-light f-w-500 f-12 ms-2">3 Item</span></span></div>
                              <div className="text-end"> 
                                <div className="dropdown icon-dropdown">
                                  <button className="btn dropdown-toggle" id="order-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="order-4"><a className="dropdown-item" href="cart.html">Add to cart</a><a className="dropdown-item" href="#">Cancel</a></div>
                                </div><span className="f-light f-w-500 f-12">$2,000</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="light-card"> <img src="../assets/images/dashboard/product/5.png" alt="watch"/></div>
                            <div className="order-content">
                              <div> <a href="order-history.html">
                                  <h6 className="mb-1">Wall Watch</h6></a><span> <span className="badge badge-light-primary">#101098</span><span className="f-light f-w-500 f-12 ms-2">1 Item</span></span></div>
                              <div className="text-end"> 
                                <div className="dropdown icon-dropdown">
                                  <button className="btn dropdown-toggle" id="order-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg>
                                      <use href="../assets/svg/icon-sprite.svg#more-horizontal"></use>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="order-5"><a className="dropdown-item" href="cart.html">Add to cart</a><a className="dropdown-item" href="#">Cancel</a></div>
                                </div><span className="f-light f-w-500 f-12">$2,000</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-xl-100 order-xl-i">
                      <div className="offer-banner">
                        <div className="offer-content"> 
                          <h2>20% Off Themes</h2>
                          <p className="f-w-500 f-12">Get all the latest wordpress theme and plugin coupon in this board.</p>
                        </div><img className="img-fluid" src="../assets/images/dashboard/banner.png" alt="vector"/>
                      </div>
                    </div>
                    <div className="col-12 col-xl-30 order-xl-ii todo-wrapper">
                      <div className="card-header card-no-border order-lists">
                        <div className="header-top">
                          <h2>To do List<span className="f-light f-12 d-block f-w-500">80 Orders in a December</span></h2>
                          <div className="card-header-right-icon"><a className="link-with-icon" href="#">+ Create</a></div>
                        </div>
                      </div>
                      <div className="card-body notification to-do-list">
                        <ul className="custom-scrollbar">
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-primary"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-1" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>Products</h6><span className="f-w-500 f-12 f-light">Today 2:00pm Clock</span>
                              </div><span className="badge badge-light-primary ms-auto">In Progress</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-warning"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-2" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>Web developing..</h6><span className="f-w-500 f-12 f-light">Due in 4 Days</span>
                              </div><span className="badge badge-light-warning ms-auto">Pending</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-success"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-3" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>UI/UX Design</h6><span className="f-w-500 f-12 f-light">Due in 3 Days</span>
                              </div><span className="badge badge-light-success ms-auto">Completed</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-primary"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-4" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>Client Meeting ..</h6><span className="f-w-500 f-12 f-light">Today 1:00pm Clock</span>
                              </div><span className="badge badge-light-primary ms-auto">In Progress</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-success"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-5" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>Wed layout</h6><span className="f-w-500 f-12 f-light">Due in 10 Days</span>
                              </div><span className="badge badge-light-success ms-auto">Completed</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-warning"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-6" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>Web developing..</h6><span className="f-w-500 f-12 f-light">Due in 4 Days</span>
                              </div><span className="badge badge-light-warning ms-auto">Pending</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="activity-dot-success"></div>
                            <div className="d-flex w-100 align-items-center"> 
                              <div className="checkbox-checked">
                                <div className="form-check">
                                  <input className="form-check-input" id="list-7" type="checkbox" value=""/>
                                </div>
                              </div>
                              <div> 
                                <h6>UI/UX Design</h6><span className="f-w-500 f-12 f-light">Due in 3 Days</span>
                              </div><span className="badge badge-light-success ms-auto">Completed</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Container-fluid Ends--> */}
        </div>
    )
}
