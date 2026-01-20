import React from "react";
import { Link, useLocation } from "react-router";
import { sideList } from "./SideBarList";

function SideBar() {
  const location = useLocation();

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "#f8f9fa",
      }}
      className="col-md-3 col-lg-2 bg-body-tertiary d-none d-md-block"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "6rem",
        }}
      >
        <div className="p-0">
          {sideList.map((list, i) => {
            const isActive = location.pathname.endsWith(list.nav);

            return (
              <Link
                key={i}
                to={list.nav}
                style={{ color: "#1463da", textDecoration: "none" }}
              >
                <p
                  style={{
                    padding: "12px",
                    margin: "12px 0px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
                    fontWeight: isActive ? 600 : 400,
                    transition: "0.3s",
                  }}
                >
                  {list.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
