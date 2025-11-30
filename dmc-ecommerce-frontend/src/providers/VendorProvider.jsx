import { useEffect, useState } from "react";
import { VendorContext } from "../screens/vendors/auth/VendorContext";
import { getVendorFromStorage } from "../utils/LocalStorage";

const VendorProvider = ({ children }) => {
  // INITIALIZE DIRECTLY FROM LOCALSTORAGE
  const [vendor, setVendor] = useState(() => getVendorFromStorage());

  useEffect(() => {
    const storedVendor = getVendorFromStorage();
    if (storedVendor) {
      setVendor(storedVendor);
    }
  }, []);

  return (
    <VendorContext.Provider value={{ vendor, setVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export default VendorProvider;
