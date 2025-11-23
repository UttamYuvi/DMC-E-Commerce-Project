import React from "react";

function NavBar() {
  return (
    <div className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div
        style={{ background: "#ffffff", margin: "0px" }}
        className="navbar-brand col-md-3 col-lg-2 me-0 py-3 fs-6 text-black"
      >
        <img src="/src/assets/logo.jpeg" width={"111px"} />
      </div>
    </div>
  );
}

export default NavBar;
