import { Container, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function MyNavbar() {
  const navigate = useNavigate()

  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart =() => {
    navigate('/cart')
  }
  return (
    
    <nav class="navbar">
      <div class="container-fluid navbar-container">
        <div class="left">
          <div class="navbar-brand">
            <h3>SHOPINFI</h3>
          </div>

          <div className="dropdown">
            <button className="dropdown-btn">Categories ▼</button>

            <div className="dropdown-content">
              <Link to="/orders">
                <p>Mens</p>
              </Link>
              <Link to="/orders">
                <p>Womens</p>
              </Link>
              <Link to="/orders">
                <p>Kids</p>
              </Link>
              <Link to="/orders">
                <p>Footwear</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <input
            className="form-control me-2 mr-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-dark ">Search</button>
          {/* mr-4 */}
        </div>
        

        <div class="right-icons">
          <img src="/src/assets/cart.png" width="30" height="30" onClick={cart}/>
          <img
            src="/src/assets/menu.png"
            width="30"
            height="30"
            onClick={() => setDrawerOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <div className={`drawer-right ${drawerOpen ? "open" : ""}`}>
            <div className="drawer-header">
              <h3>Menu</h3>

              <button
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}>
                ×
              </button>
            </div>

            <div className="drawer-links">
              <Link to="/" onClick={() => setDrawerOpen(false)}>
                <p>Home</p>
              </Link>
              <Link to="/aboutus">
                <p>About Us</p>
              </Link>
              <Link to="/orders">
                <p>Orders</p>
              </Link>
              <Link to="/profile">
                <p>Profile</p>
              </Link>
              <Link to="/help">
                <p>Help</p>
              </Link>
              <Link>
                <p>Logout</p>
              </Link>
            </div>
          </div>

          {drawerOpen && (
            <div
              className="drawer-overlay"
              onClick={() => setDrawerOpen(false)}></div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default MyNavbar;
