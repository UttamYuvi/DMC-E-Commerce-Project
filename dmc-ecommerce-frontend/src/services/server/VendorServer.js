import vendorAxios from "../axios/VendorAxios";
import createServer from "../createServer";

const VendorServer = createServer(vendorAxios);

export default VendorServer;
