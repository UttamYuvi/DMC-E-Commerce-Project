import React, { useEffect, useState } from "react";
import "./admin.css";
import serverData from "../../../services/ServerData";
import { useNavigate } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();

  const [totalVendors, setTotalVendors] = useState(0);
  const [activeVendors, setActiveVendors] = useState(0);
  const [inactiveVendors, setInactiveVendors] = useState(0);
  const [recentVendor, setRecentVendor] = useState(null);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const loadCounts = async () => {
    try {
      const res = await serverData.allVendorsList();

      if (res.data.status) {
        const vendors = res.data.data;

        setTotalVendors(vendors.length);
        setActiveVendors(vendors.filter(v => v.status === "active").length);
        setInactiveVendors(vendors.filter(v => v.status === "inactive").length);

        
        const sorted = vendors.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentVendor(sorted[0] || null);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="admin-app">
   
      <div className="admin-heading">
        <h3>Admin Dashboard</h3>
      </div>

   
      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate("/admin/pages/allVendors")}>
          <h4>Total Vendors</h4>
          <div className="admin-value">{totalVendors}</div>
        </div>
        <div className="admin-card" onClick={() => navigate("/admin/pages/activevendors")}>
          <h4>Active Vendors</h4>
          <div className="admin-value">{activeVendors}</div>
        </div>
        <div className="admin-card danger" onClick={() => navigate("/admin/pages/inactivevendors")}>
          <h4>Inactive Vendors</h4>
          <div className="admin-value">{inactiveVendors}</div>
        </div>
      </div>

      <div className="recent-vendor-section">
  <h3 className="recent-vendor-title">Recent Vendor</h3>

  {loadingRecent ? (
    <p>Loading...</p>
  ) : !recentVendor ? (
    <p>No recent vendor found.</p>
  ) : (
    <div className="table-responsive recent-vendor-table">
      <table className="table table-striped table-hover">
        <thead className="recent-vendor-head">
          <tr>
            <th>Vendor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{recentVendor.vendorId}</td>
            <td>{recentVendor.firstName}</td>
            <td>{recentVendor.lastName}</td>
            <td>{recentVendor.email}</td>
            <td className="vendor-status">
              {recentVendor.status}
            </td>
            <td>
              {new Date(recentVendor.createdAt).toLocaleDateString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
}

export default AdminDashboard;
