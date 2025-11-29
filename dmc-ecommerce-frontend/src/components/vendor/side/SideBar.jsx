import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { sideList } from "./SideBarList";
import ProfileCard from "./ProfileCard";

function SideBar() {
  const location = useLocation();
  const [openProductMenu, setOpenProductMenu] = useState(false);

  const handleProductClick = () => {
    setOpenProductMenu(!openProductMenu);
  };

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

            if (list.nav === "product") {
              return (
                <div key={i}>
                  {/* Main Product Button */}
                  <div
                    onClick={handleProductClick}
                    style={{
                      cursor: "pointer",
                      padding: "12px",
                      margin: "12px 0px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
                      color: "#1463da",

                      fontWeight: openProductMenu ? 600 : 400,
                    }}
                  >
                    {list.name}

                    {/* Arrow Icon */}
                    <span
                      style={{
                        display: "inline-block",
                        transform: openProductMenu
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "0.3s",
                        fontSize: "14px",
                      }}
                    >
                      <i className="bi bi-arrow-repeat"></i>
                    </span>
                  </div>

                  {openProductMenu && (
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      <SubItem
                        name="Category"
                        to="/page/allcategory"
                        active={location.pathname.endsWith("category")}
                      />
                      <SubItem
                        name="Subcategory"
                        to="/page/subcategory"
                        active={location.pathname.endsWith("subcategory")}
                      />
                      <SubItem
                        name="Products"
                        to="/page/product"
                        active={location.pathname.endsWith("product")}
                      />
                    </div>
                  )}
                </div>
              );
            }

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
        {/* <div>Profile card</div> */}
      </div>
    </div>
  );
}

export default SideBar;

const SubItem = ({ name, to, active }) => {
  console.log(name, to, active);
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: active ? "#1463da" : "#333" }}
    >
      <p
        style={{
          padding: "8px 12px",
          background: active ? "#e3eefc" : "#f5f5f5",
          margin: "6px 0",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: active ? 600 : 400,
          transition: "0.2s",
          boxShadow: active ? "rgba(149,157,165,0.2) 0px 4px 12px" : "none",
        }}
      >
        {name}
      </p>
    </Link>
  );
};
