const Summary = ({ totalVendors, activeVendors, inactiveVendors, totalOrders }) => {
  const Card = ({ title, value }) => (
    <div style={{
      width: "220px",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <Card title="Total Vendors" value={totalVendors} />
      <Card title="Active Vendors" value={activeVendors} />
      <Card title="Inactive Vendors" value={inactiveVendors} />
      <Card title="Total Orders" value={totalOrders} />
    </div>
  );
};

export default Summary;
