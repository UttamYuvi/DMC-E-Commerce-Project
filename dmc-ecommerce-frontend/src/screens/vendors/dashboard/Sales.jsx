import React, { useEffect, useState } from "react";
import serverData from "../../../services/ServerData";

function Sales() {

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await serverData.getSaleAndProfit()
      setSales(res.data);
    } catch (err) {
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="app">
      <br></br>
      <div><h3><b>Sales and Profits</b></h3></div>
      <br></br>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th><h4>Product</h4></th>
              <th><h4>Total Amount</h4></th>
              <th><h4>Total Profit</h4></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Loading sales data...
                </td>
              </tr>
            )}
            {!loading &&
              sales.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td><b>₹{item.amount.toFixed(2)}</b></td>
                  <td style={{ color: "green", fontWeight: "600" }}>
                    ₹{item.profit.toFixed(2)}
                  </td>
                </tr>
              ))}

            {!loading && sales.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sales;
