import React, { useEffect, useState } from "react";
import serverData from "../../../services/ServerData";

function Orders() {

  const[orders,setOrders] = useState([])
  const[statusFilter,setStatusFilter] = useState("delivered")
  const[loading,setLoading] = useState(false)

  const fetchOrder = async (status) => {
    try {
      setLoading(true)
      const response = await serverData.getOrderByStatus(status)
      setOrders(response.data)
      console.log(response.data)
    } catch(err) {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders];
    const orderId = updatedOrders[index].orderId;
    const body = {
      id: orderId,
      status: newStatus
    }
    try {
      await serverData.updateOrderStatus(body);

      updatedOrders[index].status = newStatus;
      setOrders(updatedOrders);
      fetchOrder()
      // console.log(updatedOrders)

    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  useEffect(() => {
    fetchOrder(statusFilter)
  },[statusFilter])

  return (
    <div className="app">
      <div className="heading">
        <h3>All Orders</h3>
        <br/>
        
      </div>
      <div style={{ marginBottom: "20px"}}>
        <p>Select orders by order status</p>
        <select
    
    

        className="order-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Purchase On</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colspan="6" style={{textAlign: "center"}}>
                  Loading Orders...
                </td>
              </tr>
            )}
            {!loading && orders.map((order, index) => (
              <tr>
                <td><b>{order.name}</b></td>
                <td><i>{order.firstName}</i></td>
                <td><h6>{order.created_at}</h6></td>
                <td><b>₹ {order.amount}</b></td>
                <td className={`status ${order.status}`}>
                  {order.status}
                </td>
                <td>
                  <select
                    className={`order-select ${order.status}`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value)
                    }
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Orders;
