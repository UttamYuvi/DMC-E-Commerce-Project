import { useEffect, useState } from "react";
import serverData from "../../../services/ServerData";

const Income = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncome = async () => {
    try {
      const res = await serverData.getAdminIncome(); // ✅ FIXED
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Income fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const totalIncome = orders.reduce(
    (sum, o) => sum + Number(o.totalProfit),
    0
  );

  const orderCount = orders.length;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Admin Income</h3>

      {/* Summary Cards */}
      <div className="row mb-4">
        {/* Total Income */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h6 className="text-muted">Total Admin Income</h6>
              <h2 className="fw-bold text-success">
                ₹ {totalIncome.toFixed(2)}
              </h2>
              <small className="text-secondary">
                5% commission from delivered orders
              </small>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h6 className="text-muted">Total Orders</h6>
              <h2 className="fw-bold">{orderCount}</h2>
              <small className="text-secondary">
                Paid & delivered orders
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Income Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Order-wise Income</h6>

          {loading ? (
            <p>Loading income data...</p>
          ) : orders.length === 0 ? (
            <p className="text-muted">No income data available</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Admin Profit (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.orderId}>
                      <td>{o.orderId}</td>
                      <td className="text-success fw-semibold">
                        ₹ {Number(o.totalProfit).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
