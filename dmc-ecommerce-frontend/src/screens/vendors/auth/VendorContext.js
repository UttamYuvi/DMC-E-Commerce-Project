import { createContext } from "react";

export const VendorContext = createContext({
  vendor: null,
  setVendor: () => {},
});
