import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../../services/admin";
import Summary from "./Summary";
import RecentVendor from "./RecentVendor";

function AdminDashboard() {
  const [data, setData] = useState({
    totalVendors: 0,
    activeVendors: 0,
    inactiveVendors: 0,
    totalOrders: 0,
    recentVendors: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const res = await getAdminDashboard();
    console.log("Dashboard Response 👉", res.data);

    setData({
      totalVendors: res.data.totalVendors || 0,
      activeVendors: res.data.activeVendors || 0,
      inactiveVendors: res.data.inactiveVendors || 0,
      totalOrders: res.data.totalOrders || 0,
      recentVendors: res.data.recentVendors || [], // ✅ DEFAULT
    });
  } catch (err) {
    console.error("Dashboard Error 👉", err);
  }
};;

  return (
    <>
      <Summary data={data} />
      <RecentVendor vendors={data.recentVendors} />
    </>
  );
}

export default AdminDashboard;
