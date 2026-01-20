// Vendors storage

// Store token
export const setVendorToken = (token) => {
  localStorage.setItem("vendor-token", token);
};

// Get token
export const getVendorToken = () => {
  return localStorage.getItem("vendor-token");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("vendor-token");
};

// Store vendor object
export const saveVendorToStorage = (vendor) => {
  localStorage.setItem("vendor", JSON.stringify(vendor));
};

// Get vendor object
export const getVendorFromStorage = () => {
  const data = localStorage.getItem("vendor");
  return data ? JSON.parse(data) : null;
};

// Admin storage

// Store token
export const setAdminToken = (token) => {
  localStorage.setItem("admin-token", token);
};

// Get token
export const getAdminToken = () => {
  return localStorage.getItem("admin-token");
};

// Remove token
export const removeAdminToken = () => {
  localStorage.removeItem("admin-token");
};

// Store admin object
export const saveAdminToStorage = (admin) => {
  console.log("To store admin: ", admin);
  localStorage.setItem("admin", JSON.stringify(admin));
};

// Get vendor object
export const getAdminFromStorage = () => {
  const data = localStorage.getItem("admin");
  return data ? JSON.parse(data) : null;
};

// Clear everything
export const clearAll = () => {
  localStorage.clear();
};
