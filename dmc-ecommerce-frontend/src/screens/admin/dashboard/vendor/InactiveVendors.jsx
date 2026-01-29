import React, { useEffect, useState } from "react";
import serverData from "../../../../services/ServerData";
import { Box, CircularProgress } from "@mui/material";

export default function InactiveVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInactiveVendors = async () => {
    try {
      const res = await serverData.getInactiveVendors(); 
      if (res.data.status) {
        setVendors(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load inactive vendors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInactiveVendors();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (vendors.length === 0) {
    return <p className="text-center mt-4">No inactive vendors found.</p>;
  }

  return (
    <div
      style={{ 
        minHeight: "100vh",          
        backgroundColor: "white", 
        padding: "20px"
      }}
    >
      <h3
        style={{ 
          color: "#d32f2f",           
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "4px",
          marginBottom: "20px"
        }}
      >
        Inactive Vendors
      </h3>

      <table className="table table-striped table-hover">
        <thead style={{ backgroundColor: "#c62828", color: "white" }}>
          <tr>
            <th>Vendor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.vendorId}>
              <td>{vendor.vendorId}</td>
              <td>{vendor.firstName}</td>
              <td>{vendor.lastName}</td>
              <td>{vendor.email}</td>
              <td>{vendor.mobile || vendor.phone}</td>
              <td>{vendor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
