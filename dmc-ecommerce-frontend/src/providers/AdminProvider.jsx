import { useEffect, useState } from "react";
import { getAdminFromStorage } from "../utils/LocalStorage";
import { AdminContext } from "../screens/admin/auth/AdminContext";

const AdminProvider = ({ children }) => {
  // INITIALIZE DIRECTLY FROM LOCALSTORAGE
  const [admin, setAdmin] = useState(() => getAdminFromStorage());

  useEffect(() => {
    const storedAdmin = getAdminFromStorage();
    if (storedAdmin) {
      console.log("admin provider: ", storedAdmin);
      setAdmin(storedAdmin);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
