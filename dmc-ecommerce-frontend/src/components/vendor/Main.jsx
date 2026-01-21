import { Outlet } from "react-router";

function Main() {
  return (
    <div
      className="col-md-9 col-lg-10"
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="p-3" style={{ height: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
