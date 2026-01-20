import Main from "../../../components/admin/Main";
import NavBar from "../../../components/admin/NavBar";
import SideBar from "../../../components/admin/side/SideBar";

export default function AdminMainPage() {
  return (
    <>
      <NavBar />
      <div
        className="container-fluid"
        style={{ height: "calc(100vh - 67px)", overflow: "hidden" }}
      >
        <div className="row h-100">
          <SideBar />
          <Main />
        </div>
      </div>
    </>
  );
}
