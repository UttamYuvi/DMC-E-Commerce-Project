function RecentVendor({ vendors }) {
  // ✅ SAFETY CHECK (MOST IMPORTANT)
  if (!Array.isArray(vendors) || vendors.length === 0) {
    return <p>No Vendors Found</p>;
  }

  return (
    <div>
      <h4>Recent Vendors</h4>
      {vendors.map((vendor, index) => (
        <p key={index}>
          {vendor.name || vendor.firstName || "Vendor"}
        </p>
      ))}
    </div>
  );
}

export default RecentVendor;
