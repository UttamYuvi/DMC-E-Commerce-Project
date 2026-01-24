import React, { useEffect, useState } from "react";
import "../../vendors/vendor.css";
import serverData from "../../../services/ServerData";
import { useNavigate } from "react-router";
function Dashboard() {

  const navigate = useNavigate()
  
  const[profit,setProfit] = useState(0)
  const[allOrder,setAllOrders] = useState(0)
  const[products,setProducts] = useState(0)
  const [sales,setSales] = useState(0)
  const [orders, setOrders] = useState([])

  const getSale = async () => {
    const result = await serverData.getTotalSales()
    setSales(result.data)
    const prof = result.data * 0.95
    setProfit(prof)
  }

  const result = async () => {
    const response = await serverData.allVendorRecentOrder()
    setOrders(response.data)
  }
  const getAllOrder = async () => {
    const count = await serverData.getOrderCount()
    console.log("count",count)
    setAllOrders(count.data)
  }
  const getAllProducts = async () => {
    const count = await serverData.getProductCount()
    console.log("count",count)
    setProducts(count.data)
  }

  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders]
    const oid = updatedOrders[index].orderId
    const body ={
      id: oid,
      status: newStatus
    }
    const response = await serverData.updateOrderStatus(body)
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders)
    getSale()
  }

  useEffect(() => {
    result()
    getSale()
    getAllOrder()
    getAllProducts()
  },[])

  return (
    <div className="app">
      <div className="heading">
        <h3>Activities</h3>
      </div>
      <div className="cards">
        <div className="card" style={{cursor:"pointer"}} onClick={() => navigate("/page/sales")}>
          <h4>Total Sales</h4>
          <div className="value">₹{sales}</div>
          {/* <small>This month</small> */}
        </div>
        <div className="card" style={{cursor:"pointer"}} onClick={() => navigate("/page/sales")}>
          <h4>Total Profit</h4>
          <div className="value">₹{profit}</div>
          {/* <small>Last week</small> */}
        </div>
        <div className="card" style={{cursor:"pointer"}} onClick={() => navigate("/page/orders")}>
          <h4>All Orders</h4>
          <div className="value">{allOrder}</div>
          {/* <small>Last week</small> */}
        </div>
        <div className="card" style={{cursor:"pointer"}} onClick={() => navigate("/page/allproducts")}>
          <h4 className="danger">Your Products</h4>
          <div className="value">{products}</div>
          {/* <small>Last week</small> */}
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div className="heading">
        <h3>Recent Orders</h3>
      </div>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Purchase On</th>
              <th>Amount</th>
              <th>Current Status</th>
              <th>Change Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
              <td><b>{order.name}</b></td>
              <td><i>{order.firstName}</i></td>
              <td><h6>{order.created_at}</h6></td>
              <td><b>₹ {order.amount}</b></td>
              <td className={`status ${order.status}`}>
                  {order.status}
              </td>
              <td>
                <select className={`order-select ${order.status}`}
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
            ))
            }
            {orders.length === 0 && (
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
  );
}

export default Dashboard;
