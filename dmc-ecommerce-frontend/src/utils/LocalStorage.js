// Store token
export const setToken = (token) => {
  console.log("Inside the LocalStorage: ", token);
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Store vendor object
export const saveVendorToStorage = (vendor) => {
  console.log("Inside the LocalStorage: ", vendor);
  localStorage.setItem("vendor", JSON.stringify(vendor));
};

// Get vendor object
export const getVendorFromStorage = () => {
  const data = localStorage.getItem("vendor");
  return data ? JSON.parse(data) : null;
};

// Clear everything
export const clearAll = () => {
  localStorage.clear();
};
