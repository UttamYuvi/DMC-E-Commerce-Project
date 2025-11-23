import Main from "../../../components/vendor/Main";
import NavBar from "../../../components/vendor/NavBar";
import ProfileCard from "../../../components/vendor/side/ProfileCard";
import SideBar from "../../../components/vendor/side/SideBar";

export default function MainPage() {
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
      <ProfileCard />
    </>
  );
}
