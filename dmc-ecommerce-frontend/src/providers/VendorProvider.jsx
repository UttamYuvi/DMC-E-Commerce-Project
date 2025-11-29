import { useEffect, useState } from "react";
import { VendorContext } from "../screens/vendors/auth/VendorContext";
import { getVendorFromStorage } from "../utils/LocalStorage";

const VendorProvider = ({ children }) => {
  // INITIALIZE DIRECTLY FROM LOCALSTORAGE
  const [vendor, setVendor] = useState(() => getVendorFromStorage());

  console.log("VendorProvider rendered!");

  useEffect(() => {
    const storedVendor = getVendorFromStorage();
    console.log("inside the stored Vendor Provider: ", storedVendor);
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
