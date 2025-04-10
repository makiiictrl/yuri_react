import React from "react";
import UseCurrentAgent from "../Login/UseCurrentAgent";

function formatName(fullName = "") {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default Dashboard = () => {
  const { agent } = UseCurrentAgent();
  const fullName = `${agent?.first_name ?? ""} ${agent?.last_name ?? ""}`;

  return (
    <div className="page-body">
      <div className="container-fluid default-dashboard">
        <div className="row justify-content-center align-items-start min-vh-100">
          <div className="col-12">
            <div className="card title-line upgrade-card overflow-hidden w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  {/* Text section at the start */}
                  <div className="text-section">
                    <h1 className="text-nowrap">
                      Hi, Welcome back{" "}
                      <span className="txt-primary">
                        {formatName(fullName)}
                      </span>
                    </h1>
                    {/* <p className="mt-2 f-light">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                </p> */}
                  </div>
                  {/* Image section at the end */}
                  <div className="image-section">
                    <img
                      className="img-fluid pt-5"
                      src="../assets/images/dashboard/welcome.png"
                      alt="vector"
                    />
                  </div>
                </div>
              </div>
              <img
                className="img-fluid pattern-image"
                src="../assets/images/dashboard/bg-1.png"
                alt="vector pattern"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};